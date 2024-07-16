class PasswordResetConfirmation {
    constructor({ passwordResetConfirmationService }) {
        this.passwordResetConfirmationService = passwordResetConfirmationService;
    }

    async confirmReset({ token, senha }) {
        try {
            return await this.passwordResetConfirmationService.confirmReset({ token, senha });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PasswordResetConfirmation;