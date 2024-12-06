import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ClaimModule } from './modules/claim/claim.module';
import { RepairCenterModule } from './modules/repair-center/repair-center.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { UserSchema } from './modules/users/user.schema';
import { User } from './modules/users/user.schema';
import { SeederService } from './seeder.service';
import { UserModule } from './modules/users/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // Dynamically configure Mongoose connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('DB_NAME'),
      }),
    }),
    // Dynamically configure static file serving
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [{
        rootPath: join(__dirname, '..', configService.get<string>('UPLOADS_FOLDER') || 'uploads'),
        serveRoot: configService.get<string>('UPLOADS_URL_PREFIX') || '/uploads',
      }],
    }),
    AuthModule,
    ClaimModule,
    RepairCenterModule,
    FeedbackModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {
  constructor(private readonly seederService: SeederService) {}
  async onModuleInit() {
    await this.seederService.runSeeder();
  }
}

