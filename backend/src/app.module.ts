// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { OrganizationsModule } from './organizations/organizations.module';
// import { RolesModule } from './roles/roles.module';

// @Module({
//   imports: [
//     // 1. تفعيل قراءة ملف الـ .env وجعله متاحاً في كامل المشروع
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),

//     // 2. الربط التلقائي بقاعدة بيانات MongoDB Atlas السحابية
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         uri: configService.get<string>('MONGO_URI'),
//       }),
//     }),

//     // 3. الموديولات الخاصة بمشروعك (بقيت كما هي دون تغيير)
//     UsersModule, 
//     OrganizationsModule, 
//     RolesModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // تم إيقاف المونغو السحابي والاعتماد على ملفات اللابتوب المحلية
    UsersModule, 
    OrganizationsModule, 
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}