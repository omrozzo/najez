import { Injectable, BadRequestException } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { IOrganization } from './interfaces/organization.interface'; // استدعاء الإنترفيس

@Injectable()
export class OrganizationsFactory {
  constructor(private readonly orgsService: OrganizationsService) {}

  private generateNameCode(courtName: string): string {
    const cleanName = courtName.replace(/\s+/g, '');
    const prefix = cleanName.substring(0, 2).toUpperCase();
    
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    
    return `${prefix}${randomNumbers}`;
  }

  async buildAndCreateCourt(body: any): Promise<IOrganization> {
    const existingOrg = await this.orgsService.findByCode(body.code);
    if (existingOrg) {
      throw new BadRequestException('كود هذه المحكمة مسجل مسبقاً في النظام');
    }

    const generatedId = `org-${Math.floor(100000 + Math.random() * 900000)}`;
    const generatedNameCode = this.generateNameCode(body.courtName);

    const fullOrgStructure = {
      courtName: body.courtName,
      courtType: body.courtType,
      address: body.address,
      phoneNumber: body.phoneNumber,
      meta: {
        orgInfo: {
          id: generatedId,
          name: generatedNameCode,
          code: body.code,
        },
      },
    };

    return await this.orgsService.saveToDb(fullOrgStructure);
  }
}
