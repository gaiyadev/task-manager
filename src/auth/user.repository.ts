import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException, UnauthorizedException
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const saltOrRounds = await bcrypt.genSalt(12);
    const user = new User();
    user.username = username;
    user.password = await this.hashPasssword(password, saltOrRounds);
    try {
      await user.save();
      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username already exist');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(authCredentialsDto: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Username or Password is invalid');
    }
    const isMatch = await this.comparePassword(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Username or Password is invalid');
    }
    return user;
  }
  // Hashing user password
  private async hashPasssword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
  // Comparing user password
  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
