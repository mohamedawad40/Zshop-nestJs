import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const { email, password, role } = createUserDto;
        const user = await this.usersService.createUser({ email, password, role });
        return user;
    }

    @Get('profile')
    async getProfile(@Req() req: Request) {
        // const user = req.user;
        // return user;
    }
}
