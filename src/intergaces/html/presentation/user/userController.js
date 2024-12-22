require('dotenv').config();

class UserController {
    constructor({ createUserOperation, 
        loginOperation, 
        emailConfirmationOperation, 
        requestResetOperation, 
        passwordResetConfirmationOperation, 
        getUserOperation 
    }) {
        this.createUserOperation = createUserOperation;
        this.loginOperation = loginOperation;
        this.emailConfirmationOperation = emailConfirmationOperation;
        this.requestResetOperation = requestResetOperation;
        this.passwordResetConfirmationOperation = passwordResetConfirmationOperation;
        this.getUserOperation = getUserOperation
    }

    async createUser(req, res) {
        try {
            console.log("Create User ---- ")
            const { email, name, role, senha } = req.body;
            const newUser = await this.createUserOperation.createUser({ email, name, role, senha });
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Unable to create user' });
        }
    }

    async confirmEmail(req, res) {
        const { token } = req.params;
        await this.emailConfirmationOperation.confirmEmail({ token });
        res.status(200).send('Email confirmed and user created');
    }

    async requestReset(req, res) {
        const { email } = req.params;
        await this.requestResetOperation.requestReset({ email });
        res.status(200).send('Email reset created');
    }

    async confirmReset(req, res) {
        const { token } = req.params;
        const { senha } = req.body;
        await this.passwordResetConfirmationOperation.confirmReset({ token, senha });
        res.status(200).send('senhas reseted');
    }

    async loginUser(req, res) {
        const { email, senha } = req.body;
      
        try {
            const token = await this.loginOperation.loginUser( email, senha );
            res.json(token);
        } catch (err) {
            console.log('err------', err)
            res.status(401).json({ message: err.message });
        }
    }

    async getUser(req, res) {
        const { user_id} = req.params;
      
        try {
            const user = await this.getUserOperation.getUser( user_id );
            res.json(user);
        } catch (err) {
            console.log('err------', err)
            res.status(401).json({ message: err.message });
        }
    }
}

module.exports = UserController;