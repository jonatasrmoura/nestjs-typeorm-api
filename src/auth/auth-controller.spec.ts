import { Test } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FileService } from '../file/file.service';
import { AuthGuard } from '../guards/auth.guard';

import { guardMock } from '../testing/guard.mock';
import { authServiceMock } from '../testing/auth-service.mock';
import { fileServiceMock } from '../testing/file-service.mock';
import { authLoginDto } from '../testing/auth-login-dto.mock';
import { accessToken } from '../testing/access-token.mock';
import { authRegisterDto } from '../testing/auth-register-dto.mock';
import { authForgetDto } from '../testing/auth-forget-dto.mock';
import { authResetDto } from '../testing/auth-reset-dto.mock';
import { userEntityList } from '../testing/user.entity-list.mock';
import { getPhoto } from '../testing/get-photo.mock';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let fileService: FileService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    fileService = module.get<FileService>(FileService);
  });

  test('Validar a definição', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
    expect(fileService).toBeDefined();
  });

  describe('Fluxo de autenticação', () => {
    test('login method', async () => {
      const result = await authController.login(authLoginDto);
      expect(result).toEqual({ accessToken });
    });

    test('register method', async () => {
      const result = await authController.register(authRegisterDto);
      expect(result).toEqual({ accessToken });
    });

    test('forget method', async () => {
      const result = await authController.forget(authForgetDto);
      expect(result).toEqual({ success: true });
    });

    test('reset method', async () => {
      const result = await authController.reset(authResetDto);
      expect(result).toEqual({ accessToken });
    });
  });

  describe('Rotas autenticadas', () => {
    test('me method', async () => {
      const result = await authController.me(userEntityList[0]);
      expect(result).toEqual(userEntityList[0]);
    });

    test('uploadPhoto method', async () => {
      const photo = await getPhoto();
      const result = await authController.uploadPhoto(userEntityList[0], photo);
      expect(result).toEqual(photo);
    });
  });
});
