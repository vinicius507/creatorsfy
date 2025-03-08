import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FastifyReply } from "fastify";
import { Observable, map } from "rxjs";
import { z } from "zod";

@Injectable()
export class ZodInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const res = context.switchToHttp().getResponse<FastifyReply>();
    const responseSchema = this.getResponseSchema(context, res.statusCode);

    return next.handle().pipe(
      map((data: unknown | unknown[]) => {
        if (!responseSchema) {
          return data;
        }

        if (Array.isArray(data)) {
          return data.map((item) => responseSchema.parse(item));
        }

        return responseSchema.parse(data);
      }),
    );
  }

  protected getResponseSchema(context: ExecutionContext, statusCode: HttpStatus) {
    const metadata = this.reflector.getAllAndOverride("swagger/apiResponse", [
      context.getHandler(),
      context.getClass(),
    ]);
    const responseMetadata = metadata?.[statusCode];

    if (!responseMetadata) {
      return null;
    }

    const dtoOrSchema = responseMetadata?.type;

    if (dtoOrSchema instanceof z.Schema) {
      return dtoOrSchema;
    }
    return dtoOrSchema?.zodSchema;
  }
}
