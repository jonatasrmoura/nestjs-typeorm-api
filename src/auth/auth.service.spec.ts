import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';

import { userRespositoryMock } from '../testing/user-repository.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { userEntityList } from '../testing/user.entity-list.mock';
import { accessToken } from '../testing/access-token.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { resetToken } from '../testing/reset-token.mock';
import { authRegisterDtoMock } from '../testing/auth-register-dto.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRespositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
      imports: [],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validar a definição', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('createToken Method', () => {
      const user = userEntityList[0];
      const result = authService.createToken(user);
      expect(result).toEqual({
        accessToken,
      });
    });

    test('checkToken Method', () => {
      const result = authService.checkToken(accessToken);
      expect(result).toEqual(jwtPayload);
    });

    test('isValidToken Method', () => {
      const result = authService.isValidToken(accessToken);
      expect(result).toEqual(true);
    });
  });

  describe('Authentication', () => {
    test('login Method', async () => {
      const result = await authService.login('glaucio@hcoce.com', 'Teste@123');
      expect(result).toEqual({ accessToken });
    });

    test('forgot Method', async () => {
      const result = await authService.forget('glaucio@hcode.com');
      expect(result).toEqual(true);
    });

    test('reset Method', async () => {
      const result = await authService.reset('Teste@123', resetToken);
      expect(result).toEqual({ accessToken });
    });

    test('register Method', async () => {
      const result = await authService.register(authRegisterDtoMock);
      expect(result).toEqual({ accessToken });
    });
  });
});
