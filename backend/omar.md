
تسميه 
vendorData;
currency;  
 <!-- هذه تسما  property  لانها ملكي داخل الكلاس  -->


//////////////////////////////


const  > let 
 <!-- const عند اعطاه اي قيمه في مكان لاتستطيع اعطاه قيمه ثانيه في مكان ما بخخلا let -->
const email = "omar@test.com";
function changeEmail() {
    email = "ali@test.com";
}
❌

//////////////////////////////

 والـ argument هو القيمة التي نمررها عند استدعاء الـ Function.
//////////////////////////////

initialization تهيه 
//////////////////////////////

<!-- القاعده هي ان متغير  عرف خارج الكلاس وخارج الفانكشن فهو متاح للجميع لكي يعدلو عليه ويستخدموه لياخذو منه بيانات ليستعملوها  -->

<!-- لكن اذا كان داخل فانكشن فيحق ان يستعمل بيانات التي بناه والده وان علا  -->
<!-- الداخل يستطيع الوصول إلى المتغيرات الموجودة في الخارج، لكن الخارج لا يستطيع الوصول إلى المتغيرات الموجودة في الداخل. -->
<!--  ايضا لو عرفت property  داخل كلاس فلن تستطيع استعمالها خارج هذا الكلاس في كلاس اخر ولو كانو في نفس الملف  -->
<!-- ايضا if try اذا عرفت vareblel دخالهما فلا تستطيع الوصول اليه  -->

function outer() {
    function inner() {
        const email = "omar@test.com";
    }

    console.log(email); // ❌
}
..
function outer() {
    const email = "omar@test.com";

    function inner() {
        console.log(email); // ✅
    }

    inner();

 //////////////////////////////

<!-- function in class  -->
الفانكشن في الملف اما ان تكون خارج الكلاس معرفه ، او داخلها والذي يلعب دور هو ان تكون داخل الكلاس ام لا 
فهي اذا كانت في الكلاس فهي ملكه ولاتستطيع استعمالها عندما تستعمل new وسنشرحها لاحقا او عند استعمال input Output 
لكن عندما يكون الكلاس محقون فتستطيع استعمال اي فانكشن عن طريق الحقن في كاسنتشركشر 

<!-- constructor -->
يجب ان تعلم ان constructor يوضع لكي تستعمل اي كلاس عادي بسهوله داخل الكلاس الذي تعمل فيه 
فمثلا انت تحتاج لكي تستخدم فانكشن موجوده داخل كلاس فبدلا من نسخه في new  تقوم بوضعه في constructor 
ثم تقوم بوضع حقن لهذا الكلاس  
class Calculator {

  add(a: number, b: number) {
    return a + b;
  }
}
class Order {

  calculate() {
    const calculator = new Calculator();

    return calculator.add(10, 20);
  }
}
لكن يجب ان تعلم ال كلاس الcompnent  لايمكن استعمال بnew
....
<!-- مثال مهم مع ملاحظهه في constructor -->
يجب ان تعلم ان داخل ال constrecter  هو مكان البارمتر التابع للكلاس نفسه ، مثلا لدينا كلاس عادي وفيه constructor 
واردنا نسخه في new  فنتعامل مع ماداخله عند النسخ ك paremter 
<!-- 
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  addedname(name){
  name * 10 
  }
}

عندما:

const user = new User('Omar', 30); -->
user.addedname(50)
 console.log === 50 * 10 = 500 

 هذا المثال يقول لك لانستعمل كوستركتر فقط من اجل حقن كلاس ثاني في الاول ، بل احيانا 
 نستخدمه لاجل  ان نضع فيه عمليات في الثاني ثم عند نسخ الثاني واخذه للاول نضع بيانات في البارمتير عند النسخ في الاول ، وتكون عمليات في الكوسترتر في الكلاس الثاني تتم لكن نعطيها بيانات من الاول فتعمل بشكل مختلف 
////////////
<!-- pravite , الpuplic -->
الpuplic هذا عام اما pravite يعني انك لن تستطيع استدخام الفانكشن ولا في اي شكل خارج الكلاس ، 

//////////////////////////////

فايده  ال parametr الذي في الفانكشن يكوم في ال constracter  في ال كلاس 
//////////////////////////////

في nest نحن نستخدم ال @Injectable()  لكي نحقنه لاحقا في contructer  الcontroler عند استخذامه 
//////////////////////////////

يجب ان تعلم ال Injectable هو بدلا من ان تقوم بجلب الكلاس عن طريق new ، تقوم بوضعه في contrctr بدون new،. 
////
اولا ال constructor هو بديل ال() في فانكشن نستدعي فيه مانشا ، لكن بشرط ان يكون الذي نستدعيه هو injacable  ,ثانيا : نحن نستطيع حل المشكله بدون injacable باسلوبين ، الاول وضع new لكل كلاس نريده ، وثانيا  استيراد الفانكشن الذي نريده من اي ملف بوضع لهexport inport 
//////////////////////////////

إذن ما الفرق؟

Function:

function Omar(name: string) {
    // تستخدم name هنا
}

Constructor:

class User {
    constructor(name: string) {
        // تستخدم name هنا
    }
}
//////////////////////////////

ههام 
يجب ان تفهم  ان الكونستراكشر ، هو في اي كلاس تذهب اليه موجود ، وفيه عمليات تتم عند بدايه عمل الكلاس ، الكلاس هو مثل الفانكشن الذي يحتوي عل فانكشن غيره ، لكن اوسع قليلا ،  فيتم اخذ نسخه منه اما عن طريق نيو او يكون محقون فناخذ نسخه منه عن طريق كانسراكتر ،  ونفهم اخير ان كانستراكتر مثل البرامترات في الفانكشن العاديه لكن لها احقيه ان تتم فيها عمليات ، اي انها هي روح الفانكش المسما كلاس ، فهي ضروريه جدا اذا كانت تريد تعديل بيانات مبدايه 
.. 
الحقيقه اذا ان الفانكشن مثل الclass ، لكن الفانكشن نقوم  بوضع بارمتر في مكان الاقواس ، ام ال كلاس فتتم في ال كونستركتر 
//////////////////////////////

والـ constructor وظيفته الأساسية تهيئة الـ object عند إنشائه، وليس إرجاع نتيجة مثل return في الفانكشن.
//////////////////////////////

إذن الكلاس نفسه لا نتعامل معه عادةً كدالة ترجع نتيجة؛ بل ننشئ منه Object، ثم نستدعي الـmethods الموجودة داخله، وهذه الـmethods تستطيع أن ترجع نتائج.
//////////////////////////////

اذا افهم ياعمر انك في الكلاس كانت في فانكشن لكن ليس له ريتيرن  انما يعتمد عل الميثود التي في داخله ،  وايضا لايستدعا مثل الفانكشن بل حيتاج نيو او حقن ، فهو يستفاد منه بالميثود التي في داخله ليس كالفانكشن ، اذا فهو يستدعا لكي يسدعا الميثود الذي في داخله ، لكن ايضا هو ليس حاويه ، بل ياخذ  باريمترات مثل الفانكشن الطبيعي  لكن هذه الباريمترات ،لاتستفيد فيها بالريترن بل في الميثود فقط ، لان الاساس والفايده من الكلاس تاتي من الميثود فقط ، فاستدعاه في اي مكان لايعطي نتيجه بل يعطينا اكسس لكي ندخل الميثود 
//////////////////////////////

map set 
this.priceBeforeNegotiationAccept.set("123", 100);
this.priceBeforeNegotiationAccept.get(item.lineSeqId) ; 
this.priceBeforeNegotiationAccept.get("123") ; 
"123" → 100
          ↑
       ترجع هذه
       ملاحظه اسال عن map set
       acceptedNegotiatedValues = new Set<string>();
//////////////////////////////

<!-- forech -->

itemsWithNegotiations.forEach((item) => {
    this.revertItemPrice(item.price);
        console.log(item);
});
شغل هذا الفانكشن بعدد هذا القيم . مع كل تشغيله ضع قيمه
فايده : هذه الفوريش تاخذ كل الاري موجده تمام مثل الماب لكن لاتعيد ارري ويمنع استخدام ريتيرن فيها ،
هي تقول لك حرفيا انا لدي اللاكسس كامله انت قل لي ماذا تريد 
فاي كود تكتبه داخلها وتستخدم اي بيانات داخلها سيعمل الكود كل مره يرا فيها بيانات ، فلو كان عندك في الارري عشر ارييات فيها عشر اسما ووضعت لها فانكشن يعمل وفي يوسر دت نيم فسيعمل الفانشن عشر مرات وهكذا 
const itemsWithNegotiations = [
    { id: 1, productName: "شاشات كمبيوتر", status: "قيد التفاوض", price: 150 },
    { id: 2, productName: "طاولات مكتب", status: "مقبول", price: 80 }
];

itemsWithNegotiations.forEach((item) => {
    console.log(item);
});

{ id: 1, productName: "شاشات كمبيوتر", status: "قيد التفاوض", price: 150 }
{ id: 2, productName: "طاولات مكتب", status: "مقبول", price: 80 }

تستتطيع ان تضعها في طريقه ما في [] ب 
const same = []
itemsWithNegotiations.forEach((item) => {
    same.push(item);
});
console.log(same);
[
  { id: 1, productName: "شاشات كمبيوتر", status: "قيد التفاوض" },
  { id: 2, productName: "طاولات مكتب", status: "مقبول" }
]

هنا نستنتج انها لاتعيد اريي ولم تخلق لهذا اصلا هي تعيد بيانات لكن هي خلقت للعمليات في داخلها مع كل دورع عل كل دوكيمينت 

معلومه في داخل فوريش لاتسعمل وعود لانها مصصمه للعمل السريع وليس للوعود 
productIds.forEach(async (id) => {
    const data = await fetch(`api/product/${id}`);
    console.log(data);
});
console.log("تمت العملية!"); 
يُرجى استخدام الرمز البرمجي بحذر.المشكلة: جملة "تمت العملية!" ستُطبع أول شيء على الشاشة! لأن الـ forEach أطلقت طلبات الـ API في الهواء ولم تنتظر الـ await أبداً، بل أكملت طريقها [لأنها حلقة للبَرم فقط ولا تكترث بالوقت].

ههههههام 
يمنع استخدام ال ريتيرن داخل ال فوريش 

//////////////////////////////

<!-- map -->
const prices = [100, 200, 300];
const newPrices = prices.map((price) => {
    return price + 10;
});
newPrices = [110, 210, 310];
تنشي لك ارري من ارري 
قاعده الماب تعيد لك اريي في كل امر اسفل منها فلو وضعت مثلا 
const result = users.map((user) => {
     return {
         name: user.name,
         number: user.number
     };
});
تعيد 
[
  { name: 'Samer', number: '0599' },
  { name: 'Khaled', number: '0598' }
]
........
const result = users.map((user) => {
     return [
         user.name, 
         user.email 
     ]; 
});
تعيد 
[
  ['samer', 'samer@gmail.co'],
  ['omar', 'omar@gmail.co']
]
ستجلب لك ارري  للاسم وارري ل رعوحثق 
معلومه مهمه ال ماب تعمل مثل فوريش لو اردت استخدام فانكشن في داخلها وايضا لو لم تكتب ريتيرن ستعمل جيدا 
لكن : 
const result = users.map((user) => {
    saveToDatabase(user); // إحداث تأثير فقط بدون return
});

console.log(result); // النتيجة: [undefined, undefined]

....
const result = users.map((user) => {
   return saveToDatabase(user); 
});

console.log(result); 

عدم اتسخدام returnnnnn 

1 : قاعده ذهبيه ، عدم استخدام ريتيرن في ماب يعني ان الذاكره ستخزن ارري من ال اوديفاند في الذاكره ، 
دالة map تقوم رغماً عنها في خلفية المتصفح بحجز مساحة في الذاكرة وإنشاء مصفوفة جديدة تماماً بنفس طول مصفوفتك القديمة

2 :  تضليل المبرمجين (Bad Readability)في لغة البرمجة، هناك ما يسمى بـ "المعنى الفلسفي للدالة". عندما يفتح مبرمج آخر كودك (أو أنت بعد 6 أشهر) ويرى كلمة map، عقله سيفهم فوراً: "أها، المبرمج هنا يريد تحويل البيانات لإنتاج مصفوفة جديدة واستخدامها".عندما يكتشف أنك استخدمتها بدون return فقط لتشغيل أمر أو فانكشن، سيتشتت ويقول: "لماذا استخدم ماب هنا وهو لا يريد مصفوفة جديدة؟".

استخدام retttturn  

بامكان وضع اي فانكن في ماب لكي يعمل وهذا غير ممنوع وبامكانك وضع ريتيرن عليه ، لكن يجب ان يكون هو في الاساس موضوع له ريترن لكي لايخزن في الذاكره نفايات من الرري،. الكود سيعمل لكن هذا سيخزن نفايات 

اذا تستطيع استعمال الماب فهي مرنه لكن لاتنسا الريتيرن ، ولا تنسا ان تكون الريتيرن لفانكشن يكون له ريتيرن  حقيقي .
والريرين الذي سيكون عل الفانكشن يجب ان لايكون الفانكشن مصمماً لكي يصنع فانكشن آخر ويُرجعه:
او لايكون فيه ريتينرن بدون نتيجه ، 
وان لايكون يتعامل مع ابياي  بلا بروميس ، فالماب جيده لاستخدام عمليات كول فيها لكن يجب وضع برومس 
map مجبرة على أخذ القيمة المرتجعة من كل لفة وتخزينها في مصفوفة جديدة، وبما أن الفانكشن (الذي يستدعي الـ API أو قاعدة البيانات) يعيد كائن Promise فوراً، فإن النتيجة الحتمية هي أن المصفوفة الجديدة التي صنعتها الـ map ستمتلئ بكائنات الـ Promises المعلقة [Promise, Promise].


same(){
    return {hane : name }
}
//////////////////////////////
 <!-- شرح -->
 <!-- obesrvable ngrx -->

 <!-- store / desbatch  -->
 هذا لكي تقول له اجلب لي البيانات المخزنه داخله في selector
 allVendors$ = this.store.pipe(select(VendorsSelectors.getAllVendors));
 ايضا ملاحظه : الوحيد select لايتعامل مع action بينما اي اضافه بيانات تحتاج ان تعمل عن طريق action 
 لهذا سترا لاحقا ان اي dispatch ستمر في action وربما تذهب ل effect || reducer مباشر 
 .......
 dispatch هو اداه لارسال ل action فقط 

	loadMarketplaceVendors() {
		this.store.dispatch(VendorsActions.loadMarketplaceVendors());
	}
يستخدم في الاتصال ب action لكي يرسل له البيانات 
 يحب ان تعلم ان select هو اشاره لجلب بيانات موجوده في راس الملف في reducer 
 ايضا  ستجد كل الفانكشن الموجده في rdeucer هي من ال actions 
 ايضا ستجد ككل الفانكشن التي تعمل فث effect تاتي من action 
 يمكن للـ Effect أن يُعطي إشارة عمل للـ Reducer (بطريقة غير مباشرة عبر إطلاق الأكشينات).
 لا، لا يمكن للـ Reducer أبداً أن يُعطي إشارة عمل للـ Effect (لأن الـ Reducer دالة مغلقة ومحمية لا تملك صلاحية إطلاق أي أحداث).
 
 الefffect لاتعطي امر مبارشر ل reducer بل تعطي امر ل action وال action يعطي امر ل reducer


.....
هام للتجربه ....
ملاحظه يجب فهم كيف يوصل الاكشن اشعارين معا لكل من reducer and affect  
//////////////
<!-- ‏subscription -->

"يتنصت الـ subscribe دائمًا على بثّ حَيّ للبيانات القادمة من ثلاثة مصادر: إما من الـ API (تأتي من السيرفر لمرة واحدة)، أو من الـ Store (NgRx) المركزي (يتحدث عبر الـ dispatch)، أو من الـ Subject/BehaviorSubject اليدوي (يتحدث محليًا عبر دالة .next)؛ وجميعها بيانات متحركة تحتاج دائمًا لأداة حماية مثل takeUntil لمنع تسريب الذاكرة."

طريقة كتابة منظومة الـ subscribe والـ pipe تبدأ دائماً من مصدر البث (الـ Observable) نفسه , اي بعد الداله التي تجلب بيانات مباشر والـ pipe لا يغير طريقة عمل الـ subscribe ولا يقطع البث، بل هو مجرد "محطة فحص وتصفية" توضع في منتصف الأنبوب قبل أن تصل البيانات إلى الـ subscribe.
 
هذه المنظومه تبدا فقط ب pipe او subscrept 
.....
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
takeUntil ماذا تفعل؟
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


////////////////
dynamicFormData?: Record<string, unknown>; 
هذا نضع في انترفيس لكي يخزن لك بيانات من كيف وفاليو في اوبجكت 
dynamicFormData = {
  firstName: "Omar",
  age: 30,
  isActive: true,
  price: 100.5
};


هام راجه 
...
const questionnaire$ = this.service.getOrgQuestionnaire(this.token); 

getOrgQuestionnaire(token: string): Observable<{ questionnaire: Questionnaire; answers?: Answers }> {
		return this.apiService.get(`questionnaires-open/token/${token}`);
	}