import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Import any other modules you need here, like JwtModule, etc.
    UsersModule,
    JwtModule.register({
      secret: 'sekretKey',
      signOptions: { expiresIn: '60s' }
    }),
    PassportModule
  ],
  providers: [AuthService, UsersService],
  exports: [AuthService]
})
export class AuthModule {}
