import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createId } from "@paralleldrive/cuid2";
import { UserDto } from "src/repository/dtos/user.dto";
import { User } from "src/repository/entity/user.entity";
import { ManagePassword } from "src/utils/bcrypt/managePassword";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser({ email, password, name }: UserDto) {
    const userHassBeenCreated = await this.getUserByEmail(email);

    if (userHassBeenCreated) {
      throw new Error("User already exists");
    }

    const hashedPassword = await ManagePassword.hashPassword(password);

    const userDatabase = {
      id: createId(),
      email,
      name,
      password: hashedPassword,
    }

    await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(userDatabase)
      .execute();

    return "User created";
  }

  public async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}

exports