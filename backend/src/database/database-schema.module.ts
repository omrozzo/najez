import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrganizationSchema } from '../organizations/organization.schema';
import { DatabaseSchemas, DB_APP } from './database.schemas';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Organization', schema: OrganizationSchema }],
      DB_APP,
    ),
  ],
  providers: [DatabaseSchemas],
  exports: [DatabaseSchemas],
})
export class DatabaseSchemaModule {}
