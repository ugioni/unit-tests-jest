class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserName(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user.name;
  }
}

module.exports = UserService;
