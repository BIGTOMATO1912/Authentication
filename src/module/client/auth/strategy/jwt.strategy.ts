import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CliAuthService } from '../auth.service';
import {
  AuthUserStrategy,
  Payload,
} from 'src/module/core/auth/model/auth.model';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(
  Strategy,
  AuthUserStrategy.JWT,
) {
  constructor(private authService: CliAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: Payload) {
    return await this.authService.validateByToken(payload.id);
  }
}
