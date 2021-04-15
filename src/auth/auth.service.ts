import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  createUser() {
    return 'Posting user data';
  }

  loginUser() {
    return 'Posting login data';
  }
}
