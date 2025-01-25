import { AuthResetDTO } from '../auth/dto/auth-reset.dto';
import { resetToken } from './reset-token.mock';

export const authResetDto: AuthResetDTO = {
  password: `Jonatas@123`,
  token: resetToken,
};
