
    import { Module } from '@nestjs/common';
    import { ConfigModule } from '@nestjs/config';
    import { HttpModule } from '@nestjs/axios';
    
    import { AppService } from './app.service';
    import { UserModule } from '@modules/user/infrastructure/nestjs/module';
import { PositionModule } from '@modules/position/infrastructure/nestjs/module';

    
    @Module({
      imports: [
        UserModule,
PositionModule,

        HttpModule,
        ConfigModule.forRoot(),
      ],
      controllers: [],
      providers: [AppService],
    })
    export class AppModule {}
    
    