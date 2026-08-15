import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { UsersModule } from '../users/users.module'; // تأكد من صحة هذا المسار الموصل للمستخدمين

@Module({
  imports: [UsersModule], // هنا نخبر السيرفر أن موديول المنظمات يستورد موديول المستخدمين
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
