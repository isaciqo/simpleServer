
const User = require('../../../database/models/user/userModel');

class ValidateLoginService {
    async validateUser(email, senha) {
        try {
            const user = await User.findOne({ email });
            console.log('returned User------', user);

            if (!user) {
                throw new Error('Authentication failed');
            }

            if (!user.isConfirmed) {
                throw new Error('conta ainda não confirmada');
            }

            if (!(user.senha === senha)) {
                throw new Error('Authentication failed');
            }

            const response = {
                user_id: user.user_id,
                schedulesCreated: user.schedulesCreated,
                schedulesJoined: user.schedulesJoined
            };

            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ValidateLoginService;