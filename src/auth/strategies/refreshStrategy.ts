import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JWTInterface } from '../ts-interfaces/jwt.interface';
import { Request } from 'express';

export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
      secretOrKey: process.env.JWT_REFRESH_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: JWTInterface) {
    const initialRefreshToken = request.get('Authorization');
    const validRefreshToken = initialRefreshToken.replace('Bearer ', '');
    return {
      ...payload,
      validRefreshToken,
    };
  }
}
