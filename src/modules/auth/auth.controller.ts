import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { LoginSchema, RecoverPasswordSchema, ResetPasswordSchema } from './auth.schema';
import { successResponse } from '../../shared/utils/response.util';
import { AuthRequest } from '../../shared/types';

export class AuthController {
  constructor(private service: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = LoginSchema.parse(req.body);
      const result = await this.service.login(dto);
      return successResponse(res, result, 'Inicio de sesión exitoso');
    } catch (error) {
      next(error);
    }
  };

  recoverPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = RecoverPasswordSchema.parse(req.body);
      await this.service.recoverPassword(dto);
      // Always return the same message for security
      return successResponse(res, null, 'Si el correo existe recibirás un enlace en minutos');
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = ResetPasswordSchema.parse(req.body);
      await this.service.resetPassword(dto);
      return successResponse(res, null, 'Contraseña actualizada correctamente');
    } catch (error) {
      next(error);
    }
  };

  getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getMe(req.user!.id);
      return successResponse(res, result);
    } catch (error) {
      next(error);
    }
  };
}
