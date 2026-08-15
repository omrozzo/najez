export class CreateOrganizationDto {
  name: string;         // اسم المحكمة (مثال: محكمة البداية المدنية بدمشق)
  code: string;         // الكود الخاص بها (مثال: court_damascus_01)
  adminName: string;    // اسم المدير الإداري لهذه المحكمة
  adminUsername: string;// اسم المستخدم للمدير (لتسجيل الدخول لاحقاً)
}