import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new user and return their API key' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      example: {
        apiKey: '3ec861ed-7b7f-476f-9aa9-dfe1c219d749',
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
