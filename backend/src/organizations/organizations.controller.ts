import { Controller, Post, Body, Get , Logger } from '@nestjs/common';
import { OrganizationsFactory } from './organizations.factory';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  private readonly logger = new Logger(OrganizationsController.name);
  constructor(
    private readonly orgsFactory: OrganizationsFactory,
    private readonly orgsService: OrganizationsService,
  ) {}

 @Post('create')
  async createCourt(@Body() body: any) {
    try {
      const result = await this.orgsFactory.buildAndCreateCourt(body);
      this.logger.log(`✅ The court has been successfully saved.
      Court ID: [${result.meta.orgInfo.id}]`);
      return result;
    } catch (error: any) {
      this.logger.error(`❌ failed [${body?.code}]. reason: ${error.message}`);
      throw error; 
    }
  }

  @Get()
  async getAll() {
    return await this.orgsService.findAllOrgs();
  }
}


// organizations/create
// 3690