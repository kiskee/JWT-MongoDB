import { UsersService } from '../../../src/users/services/user.service';
import { TestingModule, Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../../src/users/shemas/user.schema';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let userModelMock: jest.Mocked<Model<User>>;

  beforeEach(async () => {
    const mockModel = {
      find: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      // Agrega otros métodos necesarios
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockModel, // Pasamos el mock aquí
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModelMock = module.get(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shoul be defined', () => {
    expect(service).toBeDefined();
  });
  
});
