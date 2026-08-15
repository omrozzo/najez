export class User {
  id?: string;
  name: string;        // اسم الموظف الإداري أو القاضي
  username: string;    // اسم المستخدم لتسجيل الدخول
  orgId: string;       // كود المحكمة التي يعمل بها حصرياً
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
}