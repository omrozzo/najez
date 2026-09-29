import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IOrganization } from '../organizations/interfaces/organization.interface';

export const DB_APP = 'DB_APP';

@Injectable()
export class DatabaseSchemas {
  constructor(
    @InjectModel('Organization', DB_APP)
    public readonly organizationsModel: Model<IOrganization>,
  ) {}
}
