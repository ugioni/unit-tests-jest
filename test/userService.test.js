const UserService = require("../src/userService");

describe("Test UserService using mocks", () => {
  let userRepositoryMock;
  let userService;

  beforeEach(() => {
    userRepositoryMock = {
      findById: jest.fn(),
    };
    userService = new UserService(userRepositoryMock);
  });

  test("deve retornar o nome do usuário quando encontrado", async () => {
    userRepositoryMock.findById.mockResolvedValue({ id: 1, name: "Leandro" });

    const name = await userService.getUserName(1);
    expect(name).toBe("Leandro");
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(1);
  });

  test("deve lançar erro quando usuário não for encontrado", async () => {
    userRepositoryMock.findById.mockResolvedValue(null);

    await expect(userService.getUserName(99)).rejects.toThrow(
      "Usuário não encontrado"
    );
  });
});
