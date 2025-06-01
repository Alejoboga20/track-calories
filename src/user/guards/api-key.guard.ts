import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { UserWithId } from '../schemas/user.schema';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request>() as AuthenticatedRequest;
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || typeof apiKey !== 'string') {
      throw new UnauthorizedException('Missing or invalid API key');
    }

    const user = (await this.userService.findByApiKey(apiKey)) as UserWithId;

    if (!user) {
      throw new ForbiddenException('Invalid API key');
    }

    request.user = user;

    return true;
  }
}

export interface AuthenticatedRequest extends Request {
  user: UserWithId;
}
