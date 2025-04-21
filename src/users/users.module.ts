import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 makes UserRepository available
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // export, needed in other modules like Auth
})
export class UsersModule {}
