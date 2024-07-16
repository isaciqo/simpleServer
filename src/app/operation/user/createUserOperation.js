class UserOperation {
    constructor({ sendEmailService, hashPasswordService, createUserService }) {
      this.sendEmailService = sendEmailService;
      this.hashPasswordService = hashPasswordService;
      this.createUserService = createUserService;
    }
  
    async createUser({ email, name, role, senha }) {
      try {
        const hashedPassword = await this.hashPasswordService.hashPassword(senha);
  
        await this.sendEmailService.sendMail({ email, name, role, senha });
        
        return await this.createUserService.createUser({ 
          email, 
          name, 
          role, 
          senha: hashedPassword 
        });
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = UserOperation;