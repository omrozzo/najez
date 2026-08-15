import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  // تحديد مسار حفظ ملف المستخدمين في اللابتوب
  private readonly filePath = path.join(process.cwd(), 'src', 'users.json');

  constructor() {
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

  async createUser(userData: { name: string; username: string; orgId: string }) {
    const users = this.readFromFile();

    const newUser = {
      id: Math.random().toString(),
      ...userData,
      status: 'ACTIVE',
      createdAt: new Date()
    };
    
    users.push(newUser);
    this.writeToFile(users);
    
    console.log('✏️ تم حفظ حساب الموظف بنجاح في ملف users.json:', newUser);
    return newUser;
  }

  async findAllUsers() {
    return this.readFromFile();
  }
}
