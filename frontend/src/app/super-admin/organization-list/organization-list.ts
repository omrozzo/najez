import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../../services/organizations.service'; // استدعاء الخدمة المشتركة
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-organization-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './organization-list.html',
  styleUrls: ['./organization-list.css'],
})
export class OrganizationList implements OnInit {
  // 1. تحويل المتغير إلى أوبسيرفابل لمراقبة التدفق المباشر للبيانات
  organizations:any; 
  currentPage: number = 1;
  itemsPerPage: number = 5;
  hasMore: boolean = true;
  loading: boolean = false;

  constructor(private orgsService: OrganizationsService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.loading = true; // تشغيل مؤشر التحميل
    this.cdr.detectChanges(); // تنبيه الواجهة فوراً بأن وضع التحميل قد بدأ

    // 4. استخدام .subscribe() المباشر والتقليدي لاستخراج البيانات
    this.orgsService.getOrganizationsWithPagination(this.currentPage, this.itemsPerPage).subscribe({
      next: (data: any) => {
        console.log("Raw data from API:", data);
        
        // 5. الشروط التقليدية لتفصيص البيانات وحفظها في المصفوفة العادية
        if (Array.isArray(data)) {
          this.organizations = data;
        } else {
          this.organizations = [];
          console.warn("Unexpected data format:", data);
        }
        
        // تحديث الفلاتر وقفل وضع التحميل
        this.hasMore = this.organizations.length === this.itemsPerPage;
        this.loading = false; 
        
        console.log("Processed organizations assigned via subscribe:", this.organizations);
        
        // 6. إجبار الواجهة يدوياً على التحديث وعرض البيانات فوراً
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error("Error loading organizations:", error);
        this.loading = false;
        this.cdr.detectChanges(); // تحديث الواجهة حتى في حال حدوث خطأ لقفل الـ Spinner
      }
    });
  }

  nextPage() {
    if (this.hasMore) {
      this.currentPage++;
      this.loadOrganizations();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadOrganizations();
    }
  }

  getCourtName(org: any): string {
    return org?.name || org?.courtName || org?.meta?.orgInfo?.name || 'غير معروف';
  }
}