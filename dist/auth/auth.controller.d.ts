import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { FileService } from 'src/file/file.service';
import { UserEntity } from 'src/user/entity/user.entity';
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    private readonly fileService;
    constructor(userService: UserService, authService: AuthService, fileService: FileService);
    login({ email, password }: AuthLoginDTO): Promise<{
        accessToken: string;
    }>;
    register(body: AuthRegisterDTO): Promise<{
        accessToken: string;
    }>;
    forget({ email }: AuthForgetDTO): Promise<{
        resetToken: string;
    }>;
    reset({ password, token }: AuthResetDTO): Promise<{
        accessToken: string;
    }>;
    me(user: UserEntity): Promise<{
        user: UserEntity;
    }>;
    uploadPhoto(user: UserEntity, photo: Express.Multer.File): Promise<{
        sucess: boolean;
    }>;
    uploadFiles(user: UserEntity, files: Express.Multer.File[]): Promise<Express.Multer.File[]>;
    uploadFilesFields(user: UserEntity, files: {
        photo: Express.Multer.File;
        documents: Express.Multer.File[];
    }): Promise<{
        photo: Express.Multer.File;
        documents: Express.Multer.File[];
    }>;
}
