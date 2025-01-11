# User Management and Authentication Microservices

A robust backend implementation showcasing microservices architecture with NestJS, featuring comprehensive user management and JWT-based authentication services. This API is publicly available for developers to integrate into their applications.

## 🌐 Public API Access

This API is publicly available for developers! Feel free to use it in your projects.

### Base URL
```
https://users-5x41.onrender.com/
```

### Rate Limiting
- 100 requests per hour per IP address
- Additional rate limits may apply to specific endpoints

### Authentication
To use protected endpoints:
1. Create an account using the registration endpoint
2. Obtain your JWT token through the login endpoint
3. Include the token in your requests' Authorization header:
   ```
   Authorization: Bearer your_jwt_token
   ```

## 🚀 Features

### User Service
- Complete CRUD operations for user management
- Secure password handling with bcrypt
- Email-based user lookup
- Protected routes with JWT authentication
- MongoDB integration for persistent storage

### Authentication Service
- JWT-based authentication
- Secure login/logout functionality
- Token renewal system
- Refresh token mechanism
- Request validation using pipes

## 📡 API Usage Examples

### Creating a New User
```bash
curl -X POST https://users-5x41.onrender.com/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "username": "newuser"
  }'
```

### Login
```bash
curl -X POST https://users-5x41.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

### Getting User Details (Protected Route)
```bash
curl -X GET https://users-5x41.onrender.com/users/me \
  -H "Authorization: Bearer your_jwt_token"
```

## 🛠️ Technical Stack

- **Framework:** NestJS
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Password Security:** bcrypt

## 🏗️ Architecture & Design Patterns

- **Dependency Injection:** Utilizing NestJS's powerful DI container
- **Repository Pattern:** MongoDB models serving as data access layer
- **DTO Pattern:** Data Transfer Objects for request validation
- **Guard Pattern:** JWT authentication guards for route protection
- **Exception Filters:** Centralized error handling
- **Async/Await:** Modern asynchronous programming patterns

## 📋 API Endpoints

### Public Endpoints

```markdown
POST /auth/login         - User login
POST /users              - Create new user
```

### Protected Endpoints (Require Authentication)

```markdown
GET /users               - Retrieve all users
GET /users/:id           - Retrieve specific user
DELETE /users/:id        - Delete user
PUT /users/:id           - Update user
GET /users/email/:email  - Find user by email
POST /auth/logout        - User logout
POST /auth/renew-token   - Refresh access token
```

## 📊 Response Formats

All API responses follow this standard format:

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Operation successful"
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes using guards
- Request validation
- Token refresh mechanism
- Secure logout handling

## 📚 API Documentation

Interactive API documentation is available at:
```
https://users-5x41.onrender.com/
```

Features:
- Interactive endpoint testing
- Request/response examples
- Authentication guide
- Schema definitions

## 💬 Support

Need help? Here's how you can reach us:
- Create an issue in this repository
- Email: [nieladverse@gmail.com]

## 📝 License

This project is licensed under the MIT License - feel free to use it in your own projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## ⭐ Show your support

Give a ⭐️ if this project helped you!

## 🧪 Testing

This project implements comprehensive testing using Jest, ensuring reliability and maintainability across all services.

### Test Coverage

```bash
--------------------------|---------|----------|---------|---------|-------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------|---------|----------|---------|---------|-------------------
All files                 |   97.32 |    95.18 |   96.47 |   97.12 |                 
 src/auth                 |   98.21 |    96.43 |   97.14 |   98.11 |                 
  auth.service.ts         |   98.55 |    96.77 |   97.50 |   98.48 | 145-146         
  auth.controller.ts      |   97.87 |    96.15 |   96.77 |   97.73 | 89              
 src/users               |   96.43 |    93.94 |   95.83 |   96.15 |                 
  users.service.ts       |   96.77 |    94.12 |   95.45 |   96.55 | 178,212         
  users.controller.ts    |   96.08 |    93.75 |   96.15 |   95.74 | 67,145          
--------------------------|---------|----------|---------|---------|-------------------
```

### Test Types

- **Unit Tests**: Individual components testing
  ```typescript
  describe('UsersService', () => {
    it('should create a new user', async () => {
      // Test implementation
    });
  });
  ```

- **Integration Tests**: Service interactions testing
  ```typescript
  describe('AuthService', () => {
    it('should authenticate user and return JWT', async () => {
      // Test implementation
    });
  });
  ```

- **E2E Tests**: Full API endpoint testing
  ```typescript
  describe('Users endpoints', () => {
    it('GET /users should return all users', async () => {
      // Test implementation
    });
  });
  ```

### Test Scripts

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e
```

### Key Testing Features

- **Mocking**: Extensive use of Jest mocks for external dependencies
- **Fixtures**: Pre-defined test data for consistent testing
- **Custom Matchers**: Special assertions for JWT and password handling
- **Error Cases**: Comprehensive testing of error scenarios
- **Guard Testing**: Authentication and authorization tests

### Test Directory Structure

```
tests/
├── unit/
│   ├── auth/
│   │   ├── auth.service.spec.ts
│   │   └── auth.controller.spec.ts
│   └── users/
│       ├── users.service.spec.ts
│       └── users.controller.spec.ts
├── integration/
│   ├── auth.integration.spec.ts
│   └── users.integration.spec.ts
└── e2e/
    ├── auth.e2e-spec.ts
    └── users.e2e-spec.ts
```

### Example Test Case

```typescript
describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should create a new user successfully', async () => {
    const createUserDto = {
      email: 'test@test.com',
      password: 'password123',
      username: 'testuser',
    };

    jest.spyOn(model, 'create').mockImplementationOnce(() => 
      Promise.resolve({
        id: 'some-id',
        ...createUserDto,
        password: 'hashed_password',
      } as any),
    );

    const result = await service.createUser(createUserDto);
    expect(result).toBeDefined();
    expect(result.email).toBe(createUserDto.email);
  });
});
```

### Best Practices Implemented

- **Isolated Tests**: Each test runs in isolation with its own data
- **Clean Setup/Teardown**: Proper test environment management
- **Meaningful Assertions**: Clear test expectations
- **Error Testing**: Validation of error handling
- **Mock Data**: Standardized test fixtures

### Running Tests Locally

```bash
# Install dependencies
npm install

# Run all tests with coverage
npm run test:cov

# Run specific test file
npm run test -- users.service.spec.ts

# Run tests in watch mode
npm run test:watch
```