import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || typeof apiKey !== 'string') {
      throw new UnauthorizedException('Missing or invalid API key');
    }

    const user = await this.userService.findByApiKey(apiKey);

    if (!user) {
      throw new ForbiddenException('Invalid API key');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (request as any).user = user;

    return true;
  }
}
