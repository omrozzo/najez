
تسميه 
vendorData;
currency;  
 <!-- هذه تسما  property  لانها ملكي داخل الكلاس  -->


//////////////////////////////




//////////////////////////////

 والـ argument هو القيمة التي نمررها عند استدعاء الـ Function.
//////////////////////////////

initialization تهيه 
//////////////////////////////



    inner();

 //////////////////////////////






//////////////////////////////
 <!-- شرح -->
 <!-- obesrvable ngrx -->

 

.....


////////////////


هام راجه 
...
const questionnaire$ = this.service.getOrgQuestionnaire(this.token); 

getOrgQuestionnaire(token: string): Observable<{ questionnaire: Questionnaire; answers?: Answers }> {
		return this.apiService.get(`questionnaires-open/token/${token}`);
	}