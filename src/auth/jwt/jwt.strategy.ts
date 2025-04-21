import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'sekretKey',
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findUserByEmail(payload.email); // Assuming you have a method to find user by email
        if (!user) {
            throw new UnauthorizedException(); // Throw an exception if user not found
        }
        return user; // Return the user object if found
    }
}