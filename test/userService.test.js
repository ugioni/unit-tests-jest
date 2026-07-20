const UserService = require("../src/userService");

describe("user service", () => {
  test("deve retornar nome quando usuario existe", async () => {
    // Arrange
    const userRepository = {
      findById: jest.fn().mockResolvedValue({ id: 1, name: "Maria" }),
    };
    const service = new UserService(userRepository);

    // Act
    const nome = await service.getUserName(1);

    // Assert
    expect(nome).toBe("Maria");
    expect(userRepository.findById).toHaveBeenCalledWith(1);
  });

  test("deve lancar erro quando usuario nao existe", async () => {
    // Arrange
    const userRepository = {
      findById: jest.fn().mockResolvedValue(null),
    };
    const service = new UserService(userRepository);

    // Act
    const acao = service.getUserName(99);

    // Assert
    await expect(acao).rejects.toThrow("Usuário não encontrado");
  });
});
