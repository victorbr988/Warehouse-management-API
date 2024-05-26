import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../repository/dtos/user.dto';
import { User } from '../../repository/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createSession({ email, password }: UserDto): Promise<string | null> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      return null;
    }

    return user.id;
  };

 async getUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }
}
