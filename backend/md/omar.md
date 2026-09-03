
هام راجه 
...
const questionnaire$ = this.service.getOrgQuestionnaire(this.token); 

getOrgQuestionnaire(token: string): Observable<{ questionnaire: Questionnaire; answers?: Answers }> {
		return this.apiService.get(`questionnaires-open/token/${token}`);
	}