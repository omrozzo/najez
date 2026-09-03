import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrganizationsFactory } from './organizations.factory';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly orgsFactory: OrganizationsFactory,
    private readonly orgsService: OrganizationsService,
  ) {}

  @Post('create')
  async createCourt(@Body() body: any) {
    return await this.orgsFactory.buildAndCreateCourt(body);
  }

  @Get()
  async getAll() {
    return await this.orgsService.findAllOrgs();
  }
}


// organizations/create
// 3690