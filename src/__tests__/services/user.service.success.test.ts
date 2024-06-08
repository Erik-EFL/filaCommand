import { prisma } from '../../database/database';
import UserService from '../../database/services/user.services';
import { RegisterSchema } from '../../entities/Types/Register.type';

describe('UserService Success cases', () => {
  beforeAll(async () => {
    const createUsers = prisma.users.createMany({
      data: [
        { id: 1, username: 'existingUser' },
        { id: 2, username: 'unexistingUser' },
      ],
    });

    await prisma.$transaction([createUsers]);

    console.log('✨ Database seeded with 3 users');

    const updateUsers = prisma.users.update({
      where: { id: 1 },
      data: { username: 'existingUser1' },
    });

    await prisma.$transaction([updateUsers]);
  });

  afterAll(async () => {
    const deleteUsers = prisma.users.deleteMany();

    await prisma.$transaction([deleteUsers]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return a list of users when getAllUsers is called', async () => {
      const mockUsers = [
        { id: 1, username: 'existingUser' },
        { id: 2, username: 'unexistingUser' },
      ];

      jest.spyOn(prisma.users, 'findMany').mockResolvedValue(mockUsers);

      const result = await UserService.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(prisma.users.findMany).toHaveBeenCalled();
    });

    it('should return an empty list when no users exist', async () => {
      jest.spyOn(prisma.users, 'findMany').mockResolvedValue([]);

      const result = await UserService.getAllUsers();

      expect(result).toEqual([]);
      expect(prisma.users.findMany).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return a user when a valid ID is provided', async () => {
      const mockUser = { id: 1, username: 'existingUser' };
      const mockId = 1;
      jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(mockUser);

      const result = await UserService.getUserById(mockId);

      expect(result).toEqual(mockUser);
      expect(prisma.users.findUnique).toHaveBeenCalledWith({ where: { id: mockId } });
    });
  });

  describe('getUserByUsername', () => {
    it('should return a user when a valid username is provided', async () => {
      const mockUser = { id: 1, username: 'existingUser' };
      jest.spyOn(prisma.users, 'findFirst').mockResolvedValue(mockUser);

      const result = await UserService.getUserByUsername('existingUser');

      expect(result).toEqual(mockUser);
      expect(prisma.users.findFirst).toHaveBeenCalledWith({ where: { username: 'existingUser' } });
    });
  });

  describe('createUser', () => {
    it('should successfully create a new user with valid payload', async () => {
      const mockPayload = { username: 'existingUser' };
      const mockUser = { id: 1, username: 'existingUser' };

      jest.spyOn(RegisterSchema, 'parse').mockReturnValue(mockPayload);
      jest.spyOn(prisma.users, 'findFirst').mockResolvedValue(null);
      jest.spyOn(prisma.users, 'create').mockResolvedValue(mockUser);

      const result = await UserService.createUser(mockPayload);

      expect(result).toEqual(mockUser);
      expect(RegisterSchema.parse).toHaveBeenCalledWith(mockPayload);
      expect(prisma.users.findFirst).toHaveBeenCalledWith({ where: { username: 'existingUser' } });
      expect(prisma.users.create).toHaveBeenCalledWith({ data: { username: 'existingUser' } });
    });

    it('should validate payload against RegisterSchema when createUser is called', async () => {
      const mockPayload = { username: 'existingUser' };
      const mockUser = { id: 1, username: 'existingUser' };
      jest.spyOn(RegisterSchema, 'parse').mockReturnValue(mockPayload);
      jest.spyOn(prisma.users, 'findFirst').mockResolvedValue(null);
      jest.spyOn(prisma.users, 'create').mockResolvedValue(mockUser);

      const result = await UserService.createUser(mockPayload);

      expect(RegisterSchema.parse).toHaveBeenCalledWith(mockPayload);
      expect(prisma.users.findFirst).toHaveBeenCalledWith({ where: { username: 'existingUser' } });
      expect(prisma.users.create).toHaveBeenCalledWith({ data: { username: 'existingUser' } });
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should return an updated user when a valid ID and payload are provided', async () => {
      const mockUser = { id: 1, username: 'existingUser1' };
      const mockId = 1;
      const mockPayload = { username: 'existingUser' };
      jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(mockUser);
      jest.spyOn(prisma.users, 'update').mockResolvedValue(mockUser);

      const result = await UserService.updateUser(mockId, mockPayload);

      expect(result).toEqual(mockUser);
      expect(prisma.users.findUnique).toHaveBeenCalledWith({ where: { id: mockId } });
      expect(prisma.users.update).toHaveBeenCalledWith({ where: { id: mockId }, data: mockPayload });
    });

    it('should update the user if found', async () => {
      const mockPayload = { username: 'updatedUser' };
      const mockUser = { id: 1, username: 'updatedUser' };

      jest.spyOn(RegisterSchema, 'parse').mockReturnValue(mockPayload);
      jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(mockUser);
      jest.spyOn(prisma.users, 'update').mockResolvedValue(mockUser);

      const result = await UserService.updateUser(1, mockPayload);

      expect(RegisterSchema.parse).toHaveBeenCalledWith(mockPayload);
      expect(prisma.users.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(prisma.users.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { username: 'updatedUser' } });
      expect(result).toEqual(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user when a valid ID is provided', async () => {
      const mockUser = { id: 1, username: 'existingUser' };
      const mockId = 1;
      jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(mockUser);
      jest.spyOn(prisma.users, 'delete').mockResolvedValue(mockUser);

      const result = await UserService.deleteUser(mockId);

      expect(result).toEqual(mockUser);
      expect(prisma.users.findUnique).toHaveBeenCalledWith({ where: { id: mockId } });
      expect(prisma.users.delete).toHaveBeenCalledWith({ where: { id: mockId } });
    });
  });
});
