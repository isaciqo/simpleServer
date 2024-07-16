class LoginOperation {
    constructor({ hashPasswordService, validateLoginService, tokenGeneratorService }) {
        this.hashPasswordService = hashPasswordService;
        this.validateLoginService = validateLoginService;
        this.tokenGeneratorService = tokenGeneratorService;
    }

    async loginUser(email, senha) {
        try {
            const hashedPassword = await this.hashPasswordService.hashPassword(senha);
            const response = await this.validateLoginService.validateUser(email, hashedPassword);
            
            response.token = await this.tokenGeneratorService.generateToken(email);
            return response;

        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }
}

module.exports = LoginOperation;