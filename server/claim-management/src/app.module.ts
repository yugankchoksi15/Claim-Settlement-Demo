import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://yugankchoksi15:CaL2WWGla4wXm4sO@cluster0.evsam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{ dbName: 'claim_settlemant_db'}),AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

