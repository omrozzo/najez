import { Component  ,  DoCheck} from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.html',
  styleUrls: ['./organization-create.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule] // استيراد موديول الاستمارات العادية والاتصال
})

export class OrganizationCreateComponent  {

  datacourt: any = {
    name: '',
    address: '',
    phone: '',
    email: '',
    website: ''
  };
  constructor(private http: HttpClient ) {}
//  ngDoCheck(): void {
//     console.log('🚨 أنجولار التقطت تحركاً حياً! البيانات الحالية في الذاكرة:', this.datacourt);
//   }
  // دالة الاستقبال والإرسال للباك إند
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const formData = form.value; // سحب قيم الخانات الخمس ككائن نظيف بالملي
      
      // توجيه الطلب مباشرة إلى السيرفر الباك إند
      this.http.post('http://localhost:3000/organizations/create', formData)
        .subscribe({
          next: (response) => {
            alert('تم تأسيس المحكمة بنجاح وتوليد الـ Meta في السيرفر!');
            form.resetForm(); // تصفير وتفريغ الخانات بعد النجاح
          },
          error: (error) => {
            console.error('حدث خطأ أثناء التأسيس:', error);
            alert('فشل التأسيس: ' + (error.error?.message || 'خطأ في اتصال السيرفر'));
          }
        });
    } else {
      alert('الرجاء تعبئة كافة الخانات بشكل صحيح أولاً');
    }
  }

  onCodeChange(newCode: string): void {
  // المتغير newCode يحمل الآن البيانات الحية القادمة من المتصفح مباشرة
  console.log('هههههههههههههههه', newCode);

  // يمكنك الآن تشغيل الفحص الذكي (مثل فحص إيميل الموردين أو كود المحكمة)

}
   magicFill(): void {
    this.datacourt.name = 'محكمة البداية المدنية بدمشق';
    this.datacourt.type = 'مدني / بداية';
    this.datacourt.address = 'دمشق - قصر العدل بالمرجة';
    this.datacourt.phone = '011-2211445';
    this.datacourt.code = 'court_damascus_01';
    
    console.log('🔮 تم حشو البيانات في الذاكرة بنجاح من خلف الكواليس:', this.datacourt);
  }
}
