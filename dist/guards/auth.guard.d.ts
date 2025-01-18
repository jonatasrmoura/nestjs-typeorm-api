import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
export declare class AuthGuard implements CanActivate {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
