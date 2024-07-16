class PasswordResetConfirmation {
    constructor({ passwordResetConfirmationService, hashPasswordService }) {
        this.passwordResetConfirmationService = passwordResetConfirmationService;
        this.hashPasswordService = hashPasswordService;
    }

    async confirmReset({ token, senha }) {
        try {
            const hashSenha = await this.hashPasswordService.hashPassword(senha)
            return await this.passwordResetConfirmationService.confirmReset({ token, senha: hashSenha });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PasswordResetConfirmation;