import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../repository/entity/user.entity';
import { Not, Repository } from 'typeorm';
import { SessionDto } from 'src/repository/dtos/session.dto';
import { ManagePassword } from 'src/utils/bcrypt/managePassword';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createSession({ email, password }: SessionDto): Promise<string | null> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordValid = await ManagePassword.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return token;
  };

  private async getUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }
}
