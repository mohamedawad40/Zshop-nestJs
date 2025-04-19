import { Body, Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Request } from 'express';
import { UpdateUserDto } from './dtos/update-user.dto';

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

    @Patch('profile')
    async updateProfile(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
        // const user = req.user;
        // await this.usersService.update(user.id, updateUserDto);
        // return this.usersService.findUserByEmail(user.email);
    }

    @Delete('profile')
    async deleteProfile(@Req() req: Request) {
        // const user = req.user;
        // await this.usersService.removeUser(user.id);
        // return { message: 'User deleted successfully' };
    }
}
