import { JwtService } from '@nestjs/jwt';
import { UsersController } from '../../../src/users/controllers/users.controller';
import { UsersService } from '../../../src/users/services/user.service';
import { TestingModule, Test } from '@nestjs/testing';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('shoul be defined', () => {
    expect(service).toBeDefined();
  });
});
