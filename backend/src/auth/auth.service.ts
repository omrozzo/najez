import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private users = [
    {
      id: 1,
      email: 'omar@test.com',
      password: '123456',
      name: 'Omar',
    },
  ];

  login(email: string, password: string) {
    const user = this.users.find((user) => user.email === email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}