import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // هذه الكلمة تعني أن الخدمة مسجلة مركزياً ومتاحة لكل موديولات الفرونت إند
})
export class OrganizationsService {
  
  // الرابط الرئيسي الموجه لسيرفر الـ NestJS المحلي الخاص بك
  private apiUrl = 'http://localhost:3690/organizations';

  constructor(private http: HttpClient) {}

  /**
   * 1️⃣ دالة تأسيس المنظمة:
   * تستقبل كائن الـ Payload المرتب، وتطلق طلب POST للباك إند.
   * تعود تلقائياً بـ Observable نقي من مكتبة RxJS.
   */
  createOrganization(organizationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, organizationData);
  }

  /**
   * 2️⃣ دالة جلب كافة المنظمات:
   * تطلق طلب GET وتعود بمصفوفة المحاكم حية وسحابية لعرضها في الجداول مستقبلاً.
   */
  getAllOrganizations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * 3️⃣ دالة جلب المنظمات مع التصفح (Pagination):
   * تدعم infinite scroll - جلب عدد محدد من العناصر مع إمكانية جلب المزيد
   * @param page رقم الصفحة الحالية
   * @param limit عدد العناصر في كل صفحة
   */
  getOrganizationsWithPagination(page:number , limit :number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
}

// organizations/create
