import { Injectable, BadRequestException } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { IOrganization } from './interfaces/organization.interface'; // استدعاء الإنترفيس

@Injectable()
export class OrganizationsFactory {
  constructor(private readonly orgsService: OrganizationsService) {}

  // الدالة ترجع المحكمة المكتملة بناءً على مواصفات الإنترفيس الصارمة
  async buildAndCreateCourt(body: any): Promise<IOrganization> {
    const existingOrg = await this.orgsService.findByCode(body.code);
    if (existingOrg) {
      throw new BadRequestException('كود هذه المحكمة مسجل مسبقاً في النظام');
    }

    const generatedId = `org-${Math.floor(100000 + Math.random() * 900000)}`;

    const fullOrgStructure = {
      courtName: body.courtName,
      courtType: body.courtType,
      address: body.address,
      phoneNumber: body.phoneNumber,
      meta: {
        orgInfo: {
          id: generatedId,
          name: body.courtName,
          code: body.code,
        },
      },
    };

    return await this.orgsService.saveToDb(fullOrgStructure);
  }
}
