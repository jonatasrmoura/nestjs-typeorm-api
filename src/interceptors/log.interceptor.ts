import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
// import { tap } from 'rxjs/operators';

export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ExecutionContext>,
  ): Observable<ExecutionContext> | Promise<Observable<ExecutionContext>> {
    const dt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();

        console.log(`URL ${request.url}`);
        console.log(`Execução levou: ${Date.now() - dt} milisegundos.`);
      }),
    );
  }
}
