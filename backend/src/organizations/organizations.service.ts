import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UsersService } from '../users/users.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class OrganizationsService {
  // تحديد مسار حفظ ملف المحاكم في اللابتوب
  private readonly filePath = path.join(process.cwd(), 'src', 'organizations.json');

  constructor(private readonly usersService: UsersService) {
    // إنشائه كملف فارغ على القرص عند تشغيل السيرفر لأول مرة
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]), 'utf-8');
    }
  }

  private readFromFile(): any[] {
    const fileData = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(fileData);
  }

  private writeToFile(data: any[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async createCourtWithAdmin(dto: CreateOrganizationDto) {
    const organizations = this.readFromFile();

    const newOrg = {
      id: Math.random().toString(),
      name: dto.name,
      code: dto.code,
      status: 'ACTIVE',
      createdAt: new Date()
    };
    
    organizations.push(newOrg);
    this.writeToFile(organizations);

    // استدعاء موديول المستخدمين لصناعة حساب المدير الإداري لهذه المحكمة فوراً
    await this.usersService.createUser({
      name: dto.adminName,
      username: dto.adminUsername,
      orgId: newOrg.code,
    });

    return newOrg;
  }

  async findAllOrgs() {
    return this.readFromFile();
  }
}
