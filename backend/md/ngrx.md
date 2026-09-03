<!-- store / desbatch  -->
 هذا لكي تقول له اجلب لي البيانات المخزنه داخله في selector
 allVendors$ = this.store.pipe(select(VendorsSelectors.getAllVendors));
 ايضا ملاحظه : الوحيد select لايتعامل مع action بينما اي اضافه بيانات تحتاج ان تعمل عن طريق action 
 لهذا سترا لاحقا ان اي dispatch ستمر في action وربما تذهب ل effect || reducer مباشر 
 .......
 dispatch هو اداه لارسال ل action فقط 

	loadMarketplaceVendors() {
		this.store.dispatch(VendorsActions.loadMarketplaceVendors());
	}
يستخدم في الاتصال ب action لكي يرسل له البيانات 
 يحب ان تعلم ان select هو اشاره لجلب بيانات موجوده في راس الملف في reducer 
 ايضا  ستجد كل الفانكشن الموجده في rdeucer هي من ال actions 
 ايضا ستجد ككل الفانكشن التي تعمل فث effect تاتي من action 
 يمكن للـ Effect أن يُعطي إشارة عمل للـ Reducer (بطريقة غير مباشرة عبر إطلاق الأكشينات).
 لا، لا يمكن للـ Reducer أبداً أن يُعطي إشارة عمل للـ Effect (لأن الـ Reducer دالة مغلقة ومحمية لا تملك صلاحية إطلاق أي أحداث).
 
 الefffect لاتعطي امر مبارشر ل reducer بل تعطي امر ل action وال action يعطي امر ل reducer

