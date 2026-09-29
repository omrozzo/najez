import { Document } from 'mongoose';

/**
 * إنترفيس معلومات الربط الداخلية (المطابقة للـ OrgInfoSchema)
 */
export interface IOrgInfo {
  id: string;   // المعرف المولد (مثل: org-202909)
  name: string; // اسم المحكمة الرسمي
  code: string; // كود المحكمة الفريد
}

/**
 * الإنترفيس الرئيسي للمحكمة (مطابق تماماً لـ OrganizationSchema)
 * يرث من Document لكي يفهم المونغوس خصائص السيرفر الأصلية مثل _id و save()
 */
export interface IOrganization extends Document {
  courtName: string;
  courtType: string;
  address: string;
  phoneNumber: string;
  status: string;
  meta: {
    orgInfo: IOrgInfo; // دمج إنترفيس الربط هنا داخلياً
  };
  createdAt?: Date;
  updatedAt?: Date;
}
