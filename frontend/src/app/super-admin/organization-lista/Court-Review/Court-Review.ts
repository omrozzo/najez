import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../../../services/organizations.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, tap, startWith, catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-court-review',
  imports: [CommonModule, RouterModule],
  templateUrl: './court-review.html',
  styleUrls: ['./court-review.css'],
})
export class CourtReview implements OnInit {
  currentPage$ = new BehaviorSubject<number>(1);
  itemsPerPage: number = 5;
  
  organizations$: Observable<any> = combineLatest([this.currentPage$]).pipe(
    tap(([page]) => console.log('Loading page:', page)),
    map(([page]) => page),
    switchMap((page) => 
      this.orgsService.getOrganizationsWithPagination(page, this.itemsPerPage).pipe(
        tap(data => console.log("Raw data from API:", data)),
        map((data: any) => {
          if (Array.isArray(data)) {
            return {
              data: data,
              hasMore: data.length === this.itemsPerPage
            };
          } else {
            console.warn("Unexpected data format:", data);
            return {
              data: [],
              hasMore: false
            };
          }
        }),
        catchError(error => {
          console.error("Error loading organizations:", error);
          return of({ data: [], hasMore: false });
        })
      )
    ),
    startWith({ data: [], hasMore: false })
  );

  constructor(private orgsService: OrganizationsService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {}

  nextPage(hasMore: boolean) {
    if (hasMore) {
      this.currentPage$.next(this.currentPage$.value + 1);
    }
  }

  prevPage(currentPage: number) {
    if (currentPage > 1) {
      this.currentPage$.next(currentPage - 1);
    }
  }

  getCourtName(org: any): string {
    return org?.name || org?.courtName || org?.meta?.orgInfo?.name || 'غير معروف';
  }

  navigateToCourtData(org: any) {
    const courtId = org?.meta?.orgInfo?.id || org?.id || org?._id;
    if (courtId) {
      this.router.navigate(['/super-admin/court-data', courtId]);
    }
  }
}