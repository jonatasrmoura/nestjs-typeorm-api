import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly mailer;
    private usersRespository;
    private issuer;
    private audience;
    constructor(jwtService: JwtService, userService: UserService, mailer: MailerService, usersRespository: Repository<UserEntity>);
    createToken(user: UserEntity): {
        accessToken: string;
    };
    checkToken(token: string): any;
    isValidToken(token: string): boolean;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    forget(email: string): Promise<{
        resetToken: string;
    }>;
    reset(password: string, token: string): Promise<{
        accessToken: string;
    }>;
    register(data: AuthRegisterDTO): Promise<{
        accessToken: string;
    }>;
}
