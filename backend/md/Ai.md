<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

## Environment Variables

- Test/dev environment variables (DB connection strings, RabbitMQ URI, etc.): `libs/environments/src/lib/base/env/override.env`

## MongoDB Migrations

Every DB change (backfill, index creation, schema addition) **must** be accompanied by a migrate-mongo migration file. Migrations run automatically on every deployment via `post-deploy.sh` → `migrate-mongo up`.

**Migration files location:** `db/migrate-mongo/scripts/migrations-feature-branch/`

**Naming convention:** `YYYYMMDDHHmmss-short-description.js`

- Get timestamp: `date -u +"%Y%m%d%H%M%S"`
- Or use the npm script: `npm run migration:create -- --id <JIRA_ID> --script-name <name>`

**File structure:**

```js
module.exports = {
	async up(db) {
		// forward migration — backfill, createIndex, updateMany, etc.
		await db.collection('collection_name').updateMany(filter, update);
		await db.collection('collection_name').createIndex(keys, { name: 'index_name', background: true });
	},
	async down(db) {
		// rollback — dropIndex, revert field changes, etc.
		await db.collection('collection_name').dropIndex('index_name');
	},
};
```

**Key rules:**

- Write migrations to be **idempotent** — safe to re-run (`$exists: false` guards, `createIndex` no-ops if index exists)
- Always implement `down()` to enable rollback
- Commit the migration file **in the same PR** as the code that depends on it
- Tracked in the `changelog` collection — each file runs exactly once per environment
- Do NOT skip migrations for prod — the same file runs on test and prod via the deploy pipeline

---

## Backend Engineering Standards

### Architecture & Layering

1. **Controllers delegate only — no DB access or business logic.** A controller method does nothing except extract request context and call its module factory.

   ```ts
   // Correct
   @Put('/activate/:workspaceId')
   @Policy('update')
   async activateWorkspace(@Param('workspaceId') workspaceId: string, @Req() req): Promise<Workspace> {
     const reqUser: ReqUser = req.user;
     const dbHelper = this.getNewDbHelperWithCode(req);
     return this.workspacesApiFactory.activateDeactivateWorkspace(dbHelper, workspaceId, reqUser, true);
   }
   ```

2. **Controllers must not inject DB factories.** The correct call chain is: `controller → its own module factory → other module factory → that module's DB factory`.

   ```ts
   // Wrong — controller injecting a DB factory directly
   constructor(
     private workspacesApiFactory: WorkspacesApiFactory,
     private budgetsDbFactory: BudgetsDbFactory, // ❌
   ) {}

   // Correct chain: workspace controller → workspace factory → budget factory → budget DB factory
   ```

3. **A controller may inject only its own module's factory — never another module's factory.** To reach data from another module, go through the own module's factory (e.g. workspace controller → workspace factory → RFQ factory).

4. **A factory must not call another module's DB factory directly.** Cross-module DB access must go through that module's factory (e.g. workspace factory → RFQ factory → RFQ DB factory).

5. **All factories must extend `BaseFactory`.**
   ```ts
   @Injectable()
   export class WorkspacesApiFactory extends BaseFactory {
     constructor(...) { super(); }
   }
   ```

### Logging

6. **Controllers must contain no logger.** Loggers live only in factories/services.

   ```ts
   // Wrong — logger injected in controller
   constructor(
     private readonly logger: ApiLoggerService<WorkspacesTargetInterface>, // ❌
   ) {}

   // Correct — logger lives in the factory
   @Injectable()
   export class WorkspacesApiFactory extends BaseFactory {
     constructor(
       private readonly logger: ApiLoggerService<WorkspacesTargetInterface>, // ✅
     ) { super(); }
   }
   ```

7. **Factories must use `ApiLoggerService` only — no other loggers.** If the module lacks a logger target interface, create one in `libs/interfaces/src/lib/common/` (see `log-target.interface.ts`). One interface per module, containing only essential data (primarily the module ID).

8. **Log only on mutations (create / update / delete) — never on fetches.** Every thrown error must have an accompanying `logger.error` call.

9. **Logger call structure — success and error paths:**

   ```ts
   // Success
   this.logger.log(
   	{
   		message: `Order updated successfully`,
   		email: userEmail, // from ReqUser
   		userID: userId, // from ReqUser
   		orgCode: orgCode, // from ReqUser
   		target: { action: LogActionEnum.UPDATE, orderID: orderId },
   	},
   	'updateOrder' // context = function name
   );

   // Error
   this.logger.error(
   	{
   		message: `Failed to update order`,
   		email: userEmail,
   		userID: userId,
   		orgCode: orgCode,
   		target: { action: LogActionEnum.UPDATE, orderID: orderId },
   	},
   	error || '', // 2nd param = stack trace; pass error if present, else '' — never omit
   	'updateOrder'
   );
   ```

### Error Handling

10. **Throw errors only via the base factory's error helpers** — never throw a raw JS `Error` or framework built-ins.

    ```ts
    // Wrong
    throw new Error('Not found');
    throw new HttpException('Bad request', 400); // ❌

    // Correct
    this.throwNotFoundError('Workspace not found');
    this.throwBadRequestError('Name is required'); // ✅
    ```

    Available helpers (from `BaseFactory` via `errors.factory.ts`): `throwBadRequestError`, `throwNotFoundError`, `throwUnauthorisedError`, `throwInternalServerError`, `throwDuplicateError`.

### Database Factories

11. **Every DB access goes through a two-layer structure on the repository.** The **protected base method** is the only place `databaseHelper.*` is called directly. A **public named method** wraps it and is what the module factory calls. Never call `databaseHelper.*` directly from a module factory or controller.

    ```ts
    // Layer 1 — protected base method (only place databaseHelper is touched)
    protected async remove(workspaceId: string, orgCode: string): Promise<{ deletedCount: number }> {
      return this.databaseHelper.deleteOne(DatabaseModels.workspace, { id: workspaceId }, orgCode);
    }

    // Layer 2 — public named method (what the module factory calls)
    async deleteWorkspace(workspaceId: string, orgCode: string): Promise<Object> {
      return this.remove(workspaceId, orgCode);
    }

    // Wrong — calling databaseHelper directly from a module factory ❌
    await this.databaseHelper.deleteOne(DatabaseModels.workspace, { id: workspaceId }, orgCode);
    ```

12. **A DB factory must not inject any service.** If it needs data from another collection, that data is passed in as a parameter by the module factory.

    ```ts
    // Wrong — DB factory injecting a service
    constructor(private orgSettingsDbFactory: OrgSettingsDbFactory) {} // ❌

    // Correct — module factory fetches the data and passes it in
    const orgSettings = await this.orgSettingsDbFactory.getOrgSettings(...);
    await this.usersDbFactory.createUser(dbHelper, user, performer, orgSettings); // ✅
    ```

13. **A DB factory may access only its own module's collection.** Cross-collection queries are forbidden.

    ```ts
    // Wrong — users DB factory querying org_settings collection
    const orgSettings = await dbHelper.findOne(DatabaseModels.org_settings, ...); // ❌

    // Correct — pass the data in from the module factory (per rule 12)
    ```

14. **When initializing `dbHelper`, always include `orgCode` from `ReqUser`.**
    ```ts
    // Correct
    const dbHelper = new DatabaseHelper(this.dbSchemas, { orgInfo: reqUser.orgInfo });
    ```
    Exception: some operations genuinely do not need `orgCode` — leave that to the developer's discretion.

### Events / RMQ

15. **RMQ publishing is allowed only in the module factory** — never in a controller or DB factory.

16. **Never `await` an RMQ publish call** — it is fire-and-forget.

    ```ts
    // Wrong
    await this.rmqAdapter.publish(...); // ❌

    // Correct
    this.rmqAdapter.publish(...); // ✅
    ```

### Conventions & File Placement

17. **Always use valid, explicit return types.** Never use `any` or `unknown` as a return type.

18. **Minimal comments.** Add a comment only when the _why_ is non-obvious. Do not describe what the code does if well-named identifiers already do that.

19. **Place new declarations in the correct location:**

    - Interfaces → `libs/interfaces/src/lib/common/` (e.g. `req-user.ts`)
    - Constants & types → `libs/api-utils/src/lib/constants/` (e.g. `cache-keys.ts`)
    - Enums → `libs/enums/src/lib/` (e.g. `ai.enum.ts`)

20. **Add unit tests for every new change.** Cover the core cases: success scenarios and failure scenarios.

---

## Frontend Engineering Standards

### Angular

1. **Every new component must use `ChangeDetectionStrategy.OnPush`.** Default CD re-checks the whole tree on every event; OnPush limits checks to input-reference changes, events, and the async pipe.

   ```ts
   // Wrong — default change detection ❌
   @Component({ selector: 'app-order-list', templateUrl: './order-list.component.html' })

   // Correct ✅
   @Component({
     selector: 'app-order-list',
     templateUrl: './order-list.component.html',
     changeDetection: ChangeDetectionStrategy.OnPush,
   })
   ```

2. **Never call functions or getters in templates.** They re-run on every change-detection cycle. Use pure pipes, memoized NgRx selectors, or a precomputed component property.

   ```html
   <!-- Wrong ❌ -->
   <span>{{ getTotalPrice() }}</span>

   <!-- Correct ✅ — precomputed property / selector / pure pipe -->
   <span>{{ totalPrice$ | async }}</span>
   ```

3. **Every `*ngFor` over data that can change must have a `trackBy` function.** Without it, Angular destroys and recreates the entire DOM list on every array reference change.

   ```html
   <li *ngFor="let order of orders; trackBy: trackByOrderId">{{ order.name }}</li>
   ```

   ```ts
   trackByOrderId(_index: number, order: Order): string {
     return order.id;
   }
   ```

4. **Keep constructors free of work.** Constructors only receive dependencies; initialization logic (fetches, subscriptions, routing reads) belongs in `ngOnInit`.

5. **No business logic in templates.** Templates may contain only simple bindings and structural directives. Complex conditions move to a component property or selector.

   ```html
   <!-- Wrong ❌ -->
   <div *ngIf="user.role === 'admin' && order.status !== 'closed' && flags.editing">
   	<!-- ... -->
   </div>

   <!-- Correct ✅ -->
   <div *ngIf="canEditOrder$ | async"></div>
   ```

6. **Strongly type all `@Input()` / `@Output()`. Never `any`.** `@Output` must be a typed `EventEmitter<T>` and must not be prefixed with `on` (`selected`, not `onSelected`).

7. **Input setters must not trigger side effects (HTTP calls, dispatches).** A setter may normalize/derive local state only. React to input changes in `ngOnChanges` if orchestration is needed.

8. **New components are standalone (`standalone: true`).** Do not create new `NgModule`s for components; import dependencies directly in the component.

9. **Use `inject()` for dependency injection in new code** (functions, guards, base-class-heavy components). Constructor injection remains acceptable in existing classes — do not mix both styles in one class.

   ```ts
   export class OrderListComponent {
   	private readonly store = inject(Store);
   	private readonly ordersService = inject(OrdersService);
   }
   ```

10. **Never touch the DOM directly (`document.*`, `ElementRef.nativeElement` writes).** Use template bindings first; if imperative access is unavoidable, use `Renderer2`.

11. **Avoid `ViewEncapsulation.None`.** Keep default Emulated encapsulation with `:host`-scoped styles. Truly global styles go in the global stylesheet, explicitly scoped — never leaked from a component.

12. **Split components smart/dumb.** Container components inject the store/services and pass data down; presentational components receive `@Input`s, emit `@Output`s, and inject nothing stateful.

### RxJS

13. **Every subscription in a component must be torn down with `takeUntil(this.destroy$)`** completed in `ngOnDestroy`. Untorn subscriptions leak memory and fire after the component is gone.

    ```ts
    private readonly destroy$ = new Subject<void>();

    ngOnInit(): void {
      this.orders$.pipe(takeUntil(this.destroy$)).subscribe(...);
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
    ```

14. **Never nest `subscribe()` calls.** Use a flattening operator, chosen by intent:

    | Operator     | Use when                                                        |
    | ------------ | --------------------------------------------------------------- |
    | `switchMap`  | Only the latest result matters (typeahead, route param → fetch) |
    | `exhaustMap` | Ignore new triggers while one runs (save/submit buttons, login) |
    | `concatMap`  | Order matters, run sequentially (ordered writes)                |
    | `mergeMap`   | Independent parallel work, order irrelevant                     |

    ```ts
    // Wrong ❌
    this.route.params.subscribe((p) => {
    	this.ordersService.getOrder(p.id).subscribe((o) => (this.order = o));
    });

    // Correct ✅
    order$ = this.route.params.pipe(switchMap((p) => this.ordersService.getOrder(p.id)));
    ```

### NgRx

15. **Never mutate state — reducers and everything reading from the store return/spread new references.** All four runtime checks must stay enabled in non-prod builds (`strictStateImmutability`, `strictActionImmutability`, `strictStateSerializability`, `strictActionSerializability`).

    ```ts
    // Wrong ❌
    on(orderUpdated, (state, { order }) => {
    	state.orders[order.id] = order; // mutation
    	return state;
    });

    // Correct ✅ — entity adapter returns a new reference
    on(orderUpdated, (state, { order }) => orderAdapter.upsertOne(order, state));
    ```

16. **Use the creator APIs everywhere:** `createFeature`, `createReducer`, `createActionGroup`, `createSelector`, `createEffect`. No class-based actions, no hand-written reducer switch statements.

17. **Actions are events, not commands, named `[Source] Event`** and never reused across features. `[Order Page] Save Clicked` — not `[Order] Set Orders` dispatched from five places.

    ```ts
    export const orderPageActions = createActionGroup({
    	source: 'Order Page',
    	events: {
    		Opened: emptyProps(),
    		'Save Clicked': props<{ order: Order }>(),
    	},
    });
    ```

18. **All state reads go through memoized selectors; compose selectors from selectors.** Components must not do `store.select((s) => ...)` with inline projection logic, and must never derive view data in the component from raw state slices.

19. **Ephemeral UI state (form drafts, open/closed flags, wizard step) does NOT go in the global store.** Use BehaviorSubjects or ComponentStore if it's available, for reactive state that dies with the component; the global store is for shared, persistent, hydrated state.

## Git & PR Conventions

### Commit Messages

Commit messages must start with the Plane ticket number:

```
P-1234: <short description of the change>
```

### PR Descriptions

Use the project PR template exactly as structured in [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md):

```markdown
## Background

<why this change is needed>

## Changes

- <bullet per logical change>

## PLANE WORK ITEM(s):

- https://app.plane.so/pennyco/browse/P-<ticket>

## Deployment Considerations

- [ ] Requires database migration
- [ ] Needs environment variables updated

## Testing

- [ ] Manual/Functional Testing
- [ ] Unit Testing
- [ ] Integration Testing

## Screenshots/Recordings

<if applicable>

## Additional Notes

- <anything reviewers should know>
```
