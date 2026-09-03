import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrganization } from './interfaces/organization.interface'; // استدعاء الإنترفيس

@Injectable()
export class OrganizationsService {
  // حقن الموديل وربطه بالإنترفيس بدلاً من any
  constructor(
    @InjectModel('Organization') 
    // راجع سطر ١٠ في database-schema.module.ts 
    private readonly orgModel: Model<IOrganization>,
  ) {}

  // الدالة مجبرة الآن على إرجاع مستند يطابق شروط المحكمة بالملي
  async saveToDb(data: any): Promise<IOrganization> {
    return await this.orgModel.create(data);
  }

  async findByCode(code: string): Promise<IOrganization | null> {
    return await this.orgModel.findOne({ 'meta.orgInfo.code': code });
  }

  // الدالة تضمن إرجاع مصفوفة محاكم شرعية ومطابقة للإنترفيس
  async findAllOrgs(): Promise<IOrganization[]> {
    return await this.orgModel.find().exec();
  }
}
