const userOperation = require('../operation/userOperation');

exports.createUser = async (req, res) => {
    // Implementação da lógica para criar um usuário
    try {
        const { email, name, role, senha } = req.body; // Assume que os dados do usuário estão no corpo da solicitação

        const newUser = await userOperation.createUser({ email, name, role, senha });
        res.status(201).json(newUser); // Retorna o novo usuário criado com o status 201 (Created)
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Unable to create user' }); // Retorna um erro 500 (Internal Server Error) em caso de falha
    }    
};

exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;
  
  try {

    const token = await userOperation.loginUser( email, senha );
    
    res.json(token);

  } catch (err) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

exports.securityTest = async (req, res) => {
    res.status(200).json({ message: 'parabens!' });
};
exports.getUserById = async (req, res) => {
    // Implementação da lógica para obter um usuário por ID
};

exports.updateUser = async (req, res) => {
    // Implementação da lógica para atualizar um usuário
};

exports.deleteUser = async (req, res) => {
    // Implementação da lógica para excluir um usuário
};