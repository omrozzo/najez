import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrganizationsService } from '../../services/organizations.service'; // استدعاء الخدمة المشتركة

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.html',
  styleUrls: ['./organization-create.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class OrganizationCreateComponent {

  // كائن البيانات المحلي لمراقبة حركات الـ ngModel حياً
  datacourt: any = {
    name: '',
    type: '',
    address: '',
    phone: '',
    code: ''
  };

  // حقن الخدمة التابعة لـ الـ RxJS وموديول الاتصال
  constructor(private orgsService: OrganizationsService) {}

  onSubmit(form: NgForm): void {
    // التحقق النهائي من لمبة أمان الصندوق المركزي قبل التمرير
    if (form.valid) {
      
      // ترصيص وترتيب كائن البيانات الصافي ليتوافق مع سكيما الباك إند
      const payloadForBackend = {
        courtName: this.datacourt.name,
        courtType: this.datacourt.type,
        address: this.datacourt.address,
        phoneNumber: this.datacourt.phone,
        code: this.datacourt.code
      };

      console.log('📡 جاري فتح خط البث والاشتراك بالـ Observable...');

      // تشغيل الشرارة وإطلاق الطلب في الشبكة عبر الـ Subscribe
      this.orgsService.createOrganization(payloadForBackend).subscribe({
        next: (response) => {
          console.log('✅ استقبال أنبوب البيانات من السيرفر:', response);
          // خطة العمل عند النجاح: إشعار وتطهير الواجهة بالكامل
          alert('تم تأسيس المنظمة القضائية بنجاح، وتمت مزامنة الـ Meta السحابية!');
          form.resetForm(); // الممسحة السحرية تعيد الخانات بيضاء ونظيفة بكلمة واحدة
        },
        error: (error) => {
          console.error('🚨 فشل استقبال أنبوب البيانات من السيرفر:', error);
          alert('خطأ في التأسيس: ' + (error.error?.message || 'السيرفر غير مستقر'));
        }
      });

    } else {
      alert('يرجى التأكد من تصحيح كافة المخالفات الحمراء في الواجهة أولاً');
    }
  }

  // الرادار الفوري لالتقاط أحداث ضغط الكيبورد عبر ngModelChange وحقيبة الـ $event
  functiommmm(newCode: string): void {
    console.log('⚡ التقاط حي ومباشر لكود المنظمة أثناء الكتابة:', newCode);
  }
}
