import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessStrategy } from './strategies/accessStrategy';
import { RefreshStrategy } from './strategies/refreshStrategy';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AccessStrategy, RefreshStrategy],
})
export class AuthModule {}
