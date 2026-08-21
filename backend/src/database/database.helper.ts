export type DBSelect = {
  [key: string]: 1 | 0;
};

export interface DBHFindOptions {
  select?: DBSelect | null;
  populate?: any;
  ignoreOrgQuery?: boolean;
  session?: any;
}

export interface DatabaseHelperContext {
  orgInfo?: {
    id?: string;
    code?: string;
    name?: string;
  };
  enforceOrgInfo?: boolean;
}

export class DatabaseHelper {
  constructor(
    private readonly models: Record<string, any>,
    private readonly context: DatabaseHelperContext = {},
  ) {}

  private setOrgCodeQuery(
    query: Record<string, any> = {},
    ignoreOrgQuery = false,
  ): Record<string, any> {
    const orgCode = this.context?.orgInfo?.code;
    const shouldApply =
      this.context?.enforceOrgInfo !== false &&
      !ignoreOrgQuery &&
      !!orgCode;

    if (!shouldApply) {
      return query;
    }

    return {
      ...query,
      orgCode,
    };
  }

  private normalizeSelect(select?: DBSelect | null): DBSelect | null {
    if (!select || typeof select !== 'object') {
      return select ?? null;
    }

    const result = { ...select };

    if (!result._id) {
      result._id = 0;
    }

    return result;
  }

  async findOne(
    modelName: string,
    query: Record<string, any> = {},
    options: DBHFindOptions = {},
  ) {
    const finalQuery = this.setOrgCodeQuery(
      query,
      options.ignoreOrgQuery ?? false,
    );

    const select = this.normalizeSelect(options.select ?? null);

    if (options.session) {
      return this.models[modelName]
        .findOne(finalQuery, select ?? {})
        .session(options.session)
        .populate(options.populate)
        .lean()
        .exec();
    }

    return this.models[modelName]
      .findOne(finalQuery, select ?? {})
      .populate(options.populate)
      .lean()
      .exec();
  }

  async findMany(
    modelName: string,
    query: Record<string, any> = {},
    options: DBHFindOptions = {},
  ) {
    const finalQuery = this.setOrgCodeQuery(
      query,
      options.ignoreOrgQuery ?? false,
    );

    const select = this.normalizeSelect(options.select ?? null);

    if (options.session) {
      return this.models[modelName]
        .find(finalQuery, select ?? {})
        .session(options.session)
        .populate(options.populate)
        .lean()
        .exec();
    }

    return this.models[modelName]
      .find(finalQuery, select ?? {})
      .populate(options.populate)
      .lean()
      .exec();
  }

  async create(
    modelName: string,
    data: Record<string, any>,
    options: { session?: any } = {},
  ) {
    if (options.session) {
      return this.models[modelName].create([data], { session: options.session });
    }

    return this.models[modelName].create(data);
  }

  async updateOne(
    modelName: string,
    query: Record<string, any>,
    update: Record<string, any>,
    options: DBHFindOptions = {},
  ) {
    const finalQuery = this.setOrgCodeQuery(
      query,
      options.ignoreOrgQuery ?? false,
    );

    if (options.session) {
      return this.models[modelName]
        .updateOne(finalQuery, update, { session: options.session })
        .exec();
    }

    return this.models[modelName].updateOne(finalQuery, update).exec();
  }

  async deleteOne(
    modelName: string,
    query: Record<string, any>,
    options: DBHFindOptions = {},
  ) {
    const finalQuery = this.setOrgCodeQuery(
      query,
      options.ignoreOrgQuery ?? false,
    );

    if (options.session) {
      return this.models[modelName]
        .deleteOne(finalQuery, { session: options.session })
        .exec();
    }

    return this.models[modelName].deleteOne(finalQuery).exec();
  }
}
