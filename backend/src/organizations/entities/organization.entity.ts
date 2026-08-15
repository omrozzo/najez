export class Organization {
  id?: string;
  name: string;        // اسم المحكمة (مثال: محكمة البداية المدنية بدمشق)
  code: string;        // كود المحكمة (مثال: court_damascus_01)
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
}
