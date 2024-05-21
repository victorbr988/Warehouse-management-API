import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { SessionController } from '../session.controller';
import { SessionService } from '../session.service';
import { STATUS_CODES } from 'http';
import { User } from '../../../repository/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('SessionController', () => {
  let sessionController: SessionController;
  let sessionService: SessionService;
  let expressResponse: Response;
  let usersRepository: Partial<Record<keyof Repository<User>, jest.Mock>>;

  beforeEach(async () => {
    usersRepository = {
      findOneBy: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [
        SessionService,
        { provide: getRepositoryToken(User), useValue: usersRepository },
      ],
    }).compile();

    sessionController = app.get<SessionController>(SessionController);
    sessionService = app.get<SessionService>(SessionService);
    expressResponse = {
      status: () => expressResponse,
      json: (param: Record<string, any>) => param,
    } as any as Response;
  });

  describe('Should return message on json response', () => {
    it('Should return "Not Found" when user not found', async () => {
      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(sessionService, 'createSession').mockResolvedValue(null);

      const response = await sessionController.createSession(
        { email: 'test@test.com' },
        expressResponse,
      );

      expect(response).toEqual({ message: STATUS_CODES[404] });
    });

    it('Should return "userId" when user was found', async () => {
      const expectResponse = { userId: "1314s54d56s4ddsdcvs" };
      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue("1314s54d56s4ddsdcvs");
      jest.spyOn(sessionService, 'createSession').mockResolvedValue("1314s54d56s4ddsdcvs");

      const response = await sessionController.createSession(
        { email: 'test@test.com' },
        expressResponse,
      );

      expect(response).toEqual(expectResponse);
    });
  });
});
