import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsFactory } from './organizations.factory';
import { OrganizationSchema } from './organization.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Organization', schema: OrganizationSchema },
    ]),
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationsFactory],
  exports: [OrganizationsService, OrganizationsFactory],
})
export class OrganizationsModule {}
