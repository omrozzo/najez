import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsService } from '../../../services/organizations.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-court-data',
  imports: [CommonModule],
  templateUrl: './court-data.html',
  styleUrl: './court-data.css',
})
export class CourtData implements OnInit {
  courtData: any = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private orgsService: OrganizationsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const courtId = params.get('id');
      if (courtId) {
        this.loadCourtData(courtId);
      }
    });
  }

  loadCourtData(courtId: string) {
    console.log('Loading court data for ID:', courtId);
    this.loading = true;
    this.cdr.detectChanges();
    
    this.orgsService.getAllOrganizations().subscribe({
      next: (data: any[]) => {
        console.log('All organizations data:', data);
        console.log('Searching for court with ID:', courtId);
        
        this.courtData = data.find(org => 
          org?.meta?.orgInfo?.id === courtId || 
          org?.id === courtId || 
          org?._id === courtId
        );
        
        console.log('Found court data:', this.courtData);
        console.log('Setting loading to false');
        
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading court data:', error);
        this.error = 'حدث خطأ في تحميل بيانات المحكمة';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getCourtName(): string {
    return this.courtData?.courtName || 
           this.courtData?.name || 
           this.courtData?.meta?.orgInfo?.name || 
           'غير معروف';
  }

  getCourtType(): string {
    return this.courtData?.courtType || 'غير محدد';
  }

  getAddress(): string {
    return this.courtData?.address || 'غير محدد';
  }

  getPhoneNumber(): string {
    return this.courtData?.phoneNumber || 'غير محدد';
  }

  getCode(): string {
    return this.courtData?.meta?.orgInfo?.code || 
           this.courtData?.code || 
           'غير محدد';
  }

  getOrgId(): string {
    return this.courtData?.meta?.orgInfo?.id || 
           this.courtData?.id || 
           'غير محدد';
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
