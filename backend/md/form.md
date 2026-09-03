
لديك ثلاثه انواع form

////////////Template-Driven Form /////////

هذا الفورم هو العادي الذي ليس Reactive Form
هذا الفورم يكون عادي 
1 : 

<!-- #courtForm="ngForm"  -->
هذه لمراقبه الفورم 

<!-- [(ngmodule)] -->
هذا ياخذ بيانات من الinput ويعطيها للمتغير 
وياخذ من المتغير ويععطي ل input

<!-- ngModelChange -->
هذا تاخذ البيانات التي كتبت في انبوت وتعمل نفس عمل ngmodule
وفيها ميزه انه من الممكن ان تضع فيها فانكشن يعمل اثنا الاضافه فيها 
(ngModelChange)="functiommmm($event)" 
ال event هي البيانات التي في داخلها 
ويمكن وضع (indes , $event)  ,  ويمككن (index , "rame")

<!-- [ngModelOptions]="{standalone: true}" -->
هذه لتخبر ال form اننا منفصلين عنك 
لذا عند وضعه لاتحتاج كتابه name في ال input


<!-- name -->
هذا لتحديد اسم الحقل في الفورم 
مثال : name="firstName"
لايوثر عل شي يخرج error اذا لم يوضع لكن يتم تفاديه ب ngModelOptions

<!-- required  -->
جعل الحقل الزامي 

<!-- <form #example="ngForm"  -->
يجب ان تعلم اننا عند وضع هذا فاننا نشغل خدمه من جوجل 
هذه الخدمه تسمح اولا لك باستخدام <form  (ngSubmit)= "onSubmit(example)" 
وهذا ال example يرا مراقب لكل البيانات التي في الداخل 
فيجب عندما يضغط اي button type="submit"  فمتا عمل هذا مندون وضع فانكشن فيه بيانات فيعمل وكاننا اعطيناه البيانات 

ملاحظه :: 
بدونه لايعمل 
required ❌ ولا 
invalid ❌
 [disabled]="courtForm.invalid"  ، 

resetForm ❌ ولا  
onSubmit(form: NgForm) {
  this.http.post('...', this.datacourt).subscribe(() => {
    form.resetForm(); // مسح الخانات بكلمة واحدة
  });
}

<!--  #nameInput. from ngmodule -->
 #typeInput="ngModel" 
 [ngClass]="{ 'is-invalid': typeInput.errors?.required && typeInput.touched }"
 هذا حصرا يجب ان تكون استعملت ngmodule في نفس ال input  
 فيصبح مراقب للبيانات التي في ال input


 













<!-- Reactive Form -->
