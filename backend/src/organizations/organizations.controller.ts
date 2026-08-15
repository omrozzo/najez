import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly orgsService: OrganizationsService) {}

  @Post('create-court')
  async createCourt(@Body() dto: CreateOrganizationDto) {
    return await this.orgsService.createCourtWithAdmin(dto);
  }

  @Get()
  async getAll() {
    return await this.orgsService.findAllOrgs();
  }
}
