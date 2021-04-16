import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialDto): Promise<any> {
    const user = await this.userRepository.signUp(authCredentialsDto);
    return {
      user: { id: user.id, username: user.username, password: null },
      message: 'Account created successfully',
    };
  }

  async signIn(authCredentialsDto: AuthCredentialDto): Promise<any> {
    const user = await this.userRepository.signIn(authCredentialsDto);
    if (!user) {
      return;
    }
    const { username, id } = user;
    const payload = { username, id };
    const accessToken = await this.jwtService.sign(payload);
    return {
      user: { id: user.id, username: user.username, password: null },
      message: 'Login successfully',
      accessToken,
    };
  }
}
