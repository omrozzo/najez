import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // هذا السطر يسمح لـ OrganizationsModule باستخدام الـ UsersService
})
export class UsersModule {}
