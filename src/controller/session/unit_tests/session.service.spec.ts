import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from '../session.service';
import { User } from '../../../repository/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('SessionService', () => {
  let sessionService: SessionService;
  let usersRepository: Partial<Record<keyof Repository<User>, jest.Mock>>;

  beforeAll(async () => {
    usersRepository = {
      findOneBy: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        { provide: getRepositoryToken(User), useValue: usersRepository },
      ],
    }).compile();

    sessionService = app.get<SessionService>(SessionService);
  });


  describe('Should return response', () => {
    it('Null when user not found', async () => {
      usersRepository.findOneBy.mockResolvedValueOnce(null);

      const userId = await sessionService.createSession(
        { email: 'test@test.com', password: '123456' },
      );

      expect(userId).toBeFalsy();
    });

    it('"Id" when user was found', async () => {
      usersRepository.findOneBy.mockReturnValueOnce({
        id: "1314s54d56s4ddsdcvs",
      });

      const userId = await sessionService.createSession(
        { email: 'test@test.com',  password: '123456' },
      );

      expect(userId).toEqual("1314s54d56s4ddsdcvs");
    });
  });
});
