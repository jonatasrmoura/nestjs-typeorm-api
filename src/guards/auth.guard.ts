import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    const token = (authorization ?? '').split(' ')[1] as string;

    try {
      const data = this.authService.checkToken(token);

      request.tokenPayload = data;
      request.user = await this.userService.show(data.id);

      return true;
    } catch {
      return false;
    }
  }
}
