<!-- Iff -->
الدالة iif مصممة لضمان أن التطبيق لا يتوقف أبداً؛ فهي لا تسمح بوجود احتمالية "بطلان الكود". هي تعمل تماماً مثل عامل تحويلة القطار، إما يميناً أو يساراً:
iif(
  () => !!this.marketplaceCustomerEmail, // 1. الفحص: هل الإيميل موجود؟
  this.requestService.submitRequestForMarketplace(...), // 2. (True) -> إذا "نعم"، استمع لهذا المسار فقط.
  this.requestService.submitRequest(...) // 3. (False) -> إذا "لا"، استمع لهذا المسار البديل فوراً.
).pipe
.......

<!-- pipe  -->
في عالم RxJS، الـ pipe هو بمثابة "المطبخ أو خط الإنتاج" والـ subscribe هو "طاولة التقديم للمستهلك". لذلك، الترتيب المنطقي والإلزامي للكتابة هو أن تضع كل عمليات المعالجة، الفلترة، والتحويل داخل الـ pipe أولاً، وبعد أن ينتهي قوس الـ pipe تماماً، تضع الـ subscribe مباشرة لقفل الدائرة.
اذا نفهم من هذا الكلام انها تكون او كلمه في بدايه التنصت  وبعدها مبشار تاتي ال بابسكريبت 
ايضا نفهم ان في داخلها تتم كل العمليات ، احيانا نحتاج عمليات تعديل البيانات التي نريد التنصت عليها ، او الهدم ،غيره 

......
<!-- takeUntil  -->
ماذا تفعل؟
هي تحدد متى يجب أن يتوقف الـ Observable عن إرسال البيانات.
takeUntil(this.authService.onLogout$)  ،  takeUntil(this.destroy$)  takeUntil(this.cancel$)   
هذا خاص في قطع الاتصال لكن يجب ان تقول له متا ، وتضع له البيانات التي ستعمل فبمجرد عملها ينقطع الاتصال ، انتبه 
  destroy و cancel يجب ان تعمل هذه في الخارج حتا تعمل في takeUntil   ،  
  انظر : 
  ١ : onCancelClick() {this.cancel$.next(); }
  ٢ : ngOnDestroy() {
    this.destroy$.next();     // أطلقنا الإشارة لحارس الأمن ليقطع الحبل فوراً
    this.destroy$.complete(); // أغلقنا جهاز الإشارة نفسه نهائياً
  }

...... 
<!-- combineLatest -->
تتنصت عل احداث جديده لكن لاتجبر احد عل استعمالها
 combineLatest
 ([
this.vendorsFacade.vendorInvites$.pipe(take(1)),   // الموردين المؤقتين للدعوات
this.vendorsFacade.createdVendors$.pipe(take(1)),  // الموردين المؤقتين للإنشاء
])
الدالة combineLatest مخصصة حصرياً للتنصت على الـ Observables فقط، ولا تستطيع التعامل مع الروابط أو دالات الاتصال المباشر (API) كأقراص جامدة أو نصوص عادية.

......
<!-- switchMap -->
تاخذ البيانات من اي مكان تريده ، ثم يكون ال return الذي فيها هو الذي يتنصت عليه لاحقا ال subscrebt 
switchMap(([invitevendors, vendorsToCreate]) => {
    return forkJoin([invite$, createVendors$]);
});

يجب ان تعلم ان  switchMap هي اداه لتجبر ال subskrebt عل تعديل التنصت فتقول له تنصت وخذ بيانات لكن البيانات التي انا اضعها لك في return ، 
وثاني شي يجب ان تعلمه ان switchMap تتخلا عن forkJoin اذا كان الطلب واحد في ال return  
 switchMap(([invitevendors]) => {
        
        // هنا نقوم بعمل return للطلب الواحد مباشرة بدون forkJoin
        return this.orgInviteService.sendInvites(invitevendors); 
        
    }).subscribe

دالة الـ switchMap مضطرة ومجبرة دائماً على احتواء كلمة return بداخلها. هذا هو سبب وجودها الأساسي ووظيفتها في الحياة.لماذا هي مجبرة على الـ return دائماً؟لأن الـ switchMap تعمل كـ "موظف تحويل المكالمات". عندما تدخل إليها البيانات القديمة، هي لا تقوم بمعالجتها فقط، بل وظيفتها أن تقول للـ subscribe الخارجي: "اترك الخط القديم، وأنا الآن سأعطيك (return) خطاً جديداً تماماً لتتنصت عليه".لو نسيت كتابة return داخل الـ switchMap، سيتعطل الأنبوب تماماً، ولن يجد الـ subscribe الخارجي أي شيء يستمع إليه (سيتلقى undefined) ويموت التنصت.

......

<!-- سوال مهم  -->
	forkJoin([questionnaire$, invite$])
				.pipe(
					takeUntil(this.destroy$),
					switchMap(([questionnaireRes, inviteRes]) => {
						// When the org has a VPQ questionnaire, ALL vendors use it — including temporary
						// vendors invited from an RFQ. They must see the org-specific questionnaire form,
						// not the standard registration form. Only orgs without a questionnaire fall back
						// to the standard form.
						if (!questionnaireRes?.questionnaire?.id) {
							return forkJoin([of(inviteRes), orgLookups$, orgSettings$, lookups$, categories$]);
						} else { 
                            انا اعلم انني في سويتش ماب لا اتنصت نما اغير خريطه التنصت لكن لماذا اضطر لوضع التنصتات داخلها لكي استعملها ؟ 




<!-- forkJoin -->

نستخدم forkJoin في حالة واحدة واضحة ومحددة جداً: عندما يكون لديك عِدة طلبات (Observables) منفصلة، وتريد تشغيلها معاً بالتوازي، وتنتظر حتى تنتهي كلها بالكامل لتأخذ نتائجها دفعة واحدة.

ايضا يجب ان تعلم انها لاتتقيد بان تكون داخل switchMap 

this.buttonClick$.pipe(
    switchMap(() => {
        // نضعها هنا لأننا احتجنا لحدث الضغط أولاً قبل إطلاق الطلبات المتوازية
        return forkJoin([طلب_1$, طلب_2$]); 
    })
)
..
ngOnInit() {
    // تشغيل مباشر بدون pipe وبدون switchMap
    forkJoin([
        this.http.get('/api/users'),
        this.http.get('/api/products')
    ]).subscribe(([users, products]) => {
        this.allUsers = users;
        this.allProducts = products;
        console.log('تم جلب كل البيانات الحيوية للصفحة معاً!');
    });
}

يجب ان تعلم subscribe تعمل مباشر اذا كان هناك طلب كول واحد  بدون forkJoin السبب 
السبب في ذلك هو أن هذا الطلب الواحد (مثل this.http.get) هو في الأصل Observable جاهز ومستقل، والـ Observable يملك دالة الـ .subscribe() مدمجة فيه بشكل طبيعي.

لهذا لو كان لدينا اتصالين بكول مباشر او بمخزن حي ، فيجب ان نضع الاثنان في ف forkJoin والسبب هو ان forkJoin ينتظر حتى ينتهي كلا الاتصالين قبل ان يعيد النتيجة

السر السحري الذي يجعل forkJoin قادراً على استقبال مصفوفة طلبات وتشغيلها هو أنه يحتوي في داخله على آلية عمل subscribe لكل طلب تضعه فيه، بالإضافة إلى خواص برمجية ذكية تدير العملية بالكامل كواليس RxJS.

لكن قد تسال لماذا يوضع في returrn في switchMap لان retuern هي منتها الاتصال والتنصت ، 

ملاحظه نحن نستحدم forkJoin لطلبات حيه فقط ، بينما لو كان عندك بيانات مخزنه في obervable ف بامكانك 
combineLatest([
  this.usersFacade.allUsers$,     // كلما تغير المستخدمين
  this.productsFacade.allProducts$ // أو تغير المنتجات
]).subscribe(([users, products]) => {
  console.log('تحديث حي ومستمر للاثنين في نفس اللحظة!');
});

التنصت مباشر عبر combineLatest 

إذا كنت تريد جلب البيانات "مرة واحدة فقط" ثم إغلاق الخطإذا كنت تريد أخذ اللقطة الحالية للبيانات من الـ Observables الاثنين معاً في هذه اللحظة، وتريد تشغيلهما بالتوازي لمرة واحدة، نعم استخدم forkJoin ولكن بشرط استخدام take(1).لماذا take(1)؟ لأن البيانات المحلية لا تموت تلقائياً، والـ forkJoin كما عرفنا تشترط موت (اكتمال) الـ Observable. الـ take(1) تقوم بقتل الـ Observable فوراً بعد أخذ أول قيمة، مما يجعل الـ forkJoin تعمل بنجاح.مثال:typescriptforkJoin([
  this.usersFacade.allUsers$.pipe(take(1)),
  this.productsFacade.allProducts$.pipe(take(1))
]).subscribe(([users, products]) => {
  console.log('أخذنا لقطة حالية للاثنين معاً لمرة واحدة');
});
اي انك تستطيع اذا اردت استعمال forkJoin للتنصت عل بيانات وليس كول لكن بشرط تمويتها لانها مخصصه لكول يموت مثل كول اب اي 
......

<!-- subscription -->

"يتنصت الـ subscribe دائمًا على بثّ حَيّ للبيانات القادمة من ثلاثة مصادر: إما من الـ API (تأتي من السيرفر لمرة واحدة)، أو من الـ Store (NgRx) المركزي (يتحدث عبر الـ dispatch)، أو من الـ Subject/BehaviorSubject اليدوي (يتحدث محليًا عبر دالة .next)؛ وجميعها بيانات متحركة تحتاج دائمًا لأداة حماية مثل takeUntil لمنع تسريب الذاكرة."

طريقة كتابة منظومة الـ subscribe والـ pipe تبدأ دائماً من مصدر البث (الـ Observable) نفسه , اي بعد الداله التي تجلب بيانات مباشر والـ pipe لا يغير طريقة عمل الـ subscribe ولا يقطع البث، بل هو مجرد "محطة فحص وتصفية" توضع في منتصف الأنبوب قبل أن تصل البيانات إلى الـ subscribe.
 
هذه المنظومه تبدا فقط ب pipe او subscrept 


///////////
<!-- map + tap  -->