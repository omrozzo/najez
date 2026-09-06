
<!-- save  -->
تحزن بيانات وتعطيك البيانات التي خزنتها 
<!-- create -->
تحزن بيانات وتعطيك البيانات التي خزنتها 
<!-- الفرق بين save و create  -->
الفرق بينهما 
أسلوب الـ Model.create() (المكتب المركزي للشركة 🏢):أنت تذهب للمكتب المركزي مباشرة، وتعطيهم أوراق ومخطط الشقة. يقوم المكتب المركزي بـ أخذ الأوراق وبناء الشقة وحفظها في الأرض بضربة واحدة ودون لف ودوران [NestJS].الكود: orgModel.create(data) [NestJS].أسلوب الـ doc.save() (العامل الميداني في موقع البناء 🧱):أنت هنا لا تتصل بالمكتب المركزي مباشرة؛ بل تقوم أولاً بـ توليد وصناعة مستند عيني فارغ في الذاكرة (كأنك تضع طوب الهيكل الأساسي في الموقع) [NestJS]:الخطوة 1: const doc = new orgModel(data); [NestJS]ثم تلتفت لهذا الـ doc العيني الصغير وتأمره بأن يقوم بحفظ وتثبيت نفسه في الأرض [NestJS]:الخطوة 2: doc.save(); [NestJS]
... اذا save تحتاج const doc = new orgModel(data); ثم doc.save(); 

<!-- httb -->
1 : الرابط بعد الاستفهام هو بيانات لاتدخل في اسم الصفحه 
  getOrganizationsWithPagination(page:number , limit :number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?page=${page}&limit=${limit}`);

<!-- post  -->
مصممه لتتحمل ثلاث وسايط فقط 
import { HttpHeaders } from '@angular/common/http';

// المتغيرات والبيانات
const emails = 'user@example.com'; // متغير داخل المسار بالسلاش
const organizationData = { name: 'مؤسسة عمر البرمجية' }; // الـ Body

const myOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer MY_SECRET_TOKEN' // التوكن (Headers)
  }),
  params: {
    page: '1' // (Query آلي مدمج)
  }
};
.....
this.http.post(
  `${this.apiUrl}/${emails}/create?id=59`,organizationData,myOptions).subscribe();
  // ||
  `${this.apiUrl}/${emails}/create?id=59`,organizationData, { headers: myOptions.headers, params: myOptions.params }).subscribe();

...
 @Post(':emails/create') 
  createOrganization(
    @Body() body: any,                                   // 1. سحب الـ Body (organizationData)
    @Param('emails') emailParam: string,                 // 2. سحب المتغير الذي داخل الـ ${} (emails)
    @Query('id') idQuery: string,                        // 3. سحب الـ id القادم من وراء الـ ? اليدوية (59)
    @Query('page') pageQuery: string,                    // 4. سحب الـ page القادم من وراء الـ ? الآلية (1)
    @Headers('authorization') token: string               // 5. سحب التوكن من الـ Headers
  ) {
    
  }
}

<!-- GET  -->
نفس لpost لكنها لاتاخذ body فبعد الفاصله مباشر تاتي ال {params or hedars or all}


<!-- مثال مهم شرح كيفيه استخراج ال param , query , body , header -->
typescriptimport { HttpHeaders } from '@angular/common/http';

// المتغيرات
const orgId = '88';                       // متغير في المسار بالسلاش (Param)
const currentPage = '3';                  // متغير بعد علامة الاستفهام (Query)
const organizationData = { name: 'مؤسسة النخبة' }; // جسم الطلب (Body)

// كائن الخيارات يحتوي على التوكن، وحددنا الـ limit هنا كقانون params
const myOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer SECRET_TOKEN_123' // التوكن (Headers)
  }),
  params: {
    limit: '10' // (Query إضافي)
  }
};

// الإرسال مع الإبقاء على الرابط بالشكل الذي طلبته تحديداً
this.http.post(
  `${this.apiUrl}/update-details/${orgId}?page=${currentPage}`, // المعامل 1: الرابط اليدوي
  organizationData,                                              // المعامل 2: الـ Body
  myOptions                                                      // المعامل 3: كائن الخيارات
).subscribe();

// المتصفح ذكي جداً؛ سيأخذ الـ limit ويضيفها تلقائياً باستخدام علامة & ليطلق الرابط هكذا:
// .../update-details/88?page=3&limit=10
يُرجى استخدام الرمز البرمجي بحذر.2. في الباك آند (NestJS)السيرفر يستقبل الطلب النهائي المدمج، ويقوم بسحب العناصر الأربعة والقوانين كاملة بنجاح وبدون أي تضارب [💡]:typescriptimport { Controller, Post, Body, Query, Headers, Param } from '@nestjs/common';

@Controller('organizations')
export class OrganizationsController {

  // نضع :orgId فقط لأن المتغير جاء بين السلاش قبل منطقة الـ ?
  @Post('update-details/:orgId') 
  handleOrganizationData(
    @Param('orgId') id: string,                 // 1. سحب المتغير الذي بين السلاش (88)
    @Query('page') page: string,                // 2. سحب رقم الصفحة القادم من الرابط اليدوي (3)
    @Query('limit') limit: string,              // 3. سحب الحد الأقصى المدمج تلقائياً (10)
    @Body() body: any,                          // 4. سحب البيانات الكاملة من الـ Body
    @Headers('authorization') token: string      // 5. سحب التوكن المخفي من الـ Headers
  ) {
    // فحص النتائج في الـ Terminal الخاص بالسيرفر
    console.log('المعرّف (Param):', id);         // سيطبع: 88
    console.log('رقم الصفحة (Query):', page);     // سيطبع: 3
    console.log('الحد الأقصى (Query):', limit);    // سيطبع: 10
    console.log('محتوى الـ Body:', body);        // سيطبع: { name: 'مؤسسة النخبة' }
    console.log('التوكن (Headers):', token);     // سيطبع: Bearer SECRET_TOKEN_123

    return { success: true, message: 'تمت قراءة ودمج البيانات اليدوية والآلية بنجاح تال!' };
  }
}
<!--  قاعده في ارسال البيانات ل post . get ...  -->
يجب ان تعلم انك لاتستطيع ارسال بيانات الا ان تكون رابط وبعده bod وبعده اوبجكت  او متغير فيه اثنان اوبجكت 
وهذان الاوبجكت محصوران بان يكونان paramse and hedars , 
الفرق الوجيد بين git and post هو ان ال git  لاتمتلك مكان ل body 
,,,,
<!-- PUT  -->
تعمل لتعديل جزري  وهي من عايله post 

<!-- PATCH -->
تعمل لتعديل جزي ، وهي من عايله posst 

<!-- DELETE -->
تعمل لحذف بيانات  وهي من عايله get 
<!-- مسوده  -->
1 :  اي شي ياتي متغير داخل الرابط داخل سلاش داخل قوسين ورا علامه دولار ${}
هذا يسحب في nest عن طريق params 
2 : اي شي ياتي بعد ؟ في الرابط هذا لادخل له في الرابط وانما يسحب عن طريق query  وهذا لايكتب في nest في الرابط ابدا
فهي مجرد طريق لاعطا بيانات لا اكثر 
3 : ايضا الرابط الذي ياتي معرف ب params في انكلر يجب سحبه في nest عن طريق query  

<!-- مسوده v2 -->
(الـ Headers): تُستخدم للـ Token والحماية، وتنتقل مخفية في كواليس الطلب لإثبات هويتك بأمان [١٦]. 
(الـ ${}): تُستخدم للـ ID والمعرّفات الفريدة، وهي جزء إجباري من عنوان المسار للوصول لعنصر محدد [١٥، ١٦].
(الـ Params / الـ Query): تُستخدم للـ تصفية والبحث والصفحات، وتأتي دائماً في منطقة ما بعد علامة الاستفهام ? [١٦].
