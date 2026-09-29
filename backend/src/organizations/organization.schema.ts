import * as mongoose from 'mongoose';

// 1. سكيما معلومات الربط الداخلية (المعزولة)
const OrgInfoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true }
}, { _id: false });

// 2. السكيما الرئيسية للمحكمة
export const OrganizationSchema = new mongoose.Schema({
  courtName: { type: String, required: true },   // الاسم الرسمي
  courtType: { type: String, required: true },   // نوع المحكمة
  address: { type: String, required: true },     // العنوان
  phoneNumber: { type: String, required: true }, // رقم الهاتف
  status: { type: String, default: 'ACTIVE' },   // الحالة
  meta: {
    orgInfo: { type: OrgInfoSchema, required: true } // دمج سكيما الربط هنا
  }
}, { timestamps: true }); // توليد تاريخ الإنشاء والتحديث تلقائياً
