const userOperation = require('../operation/userOperation');

exports.createUser = async (req, res) => {
    // Implementação da lógica para criar um usuário
    try {
        const { email, name, role, senha } = req.body; // Assume que os dados do usuário estão no corpo da solicitação
        console.log('create user', name)
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
    console.log('login user', email)
    const token = await userOperation.loginUser( email, senha );
    console.log('returned User in controler------', token)
    res.json(token);

  } catch (err) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

exports.securityTest = async (req, res) => {
    res.status(200).json({ message: 'parabens!' });
};

exports.createCalendar = async (req, res) => {
    // Implementação da lógica para criar um usuário
    try {
        const { createdBy, users, calendarInformation, name, description } = req.body; // Assume que os dados do usuário estão no corpo da solicitação
        if (!createdBy || !users ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        console.log('create Calendar', createdBy)
        const newCalendar = await userOperation.createCalendar({ createdBy, users, calendarInformation, name, description });
        res.status(201).json(newCalendar); // Retorna o novo usuário criado com o status 201 (Created)
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Unable to create calendar' }); // Retorna um erro 500 (Internal Server Error) em caso de falha
    }    
};

exports.updateSchedulesCreated = async (req, res) => {
    // Implementação da lógica para criar um usuário
    try {
        const { id } = req.params;
        const { schedulesCreated } = req.body; // Assume que os dados do usuário estão no corpo da solicitação
        if (!schedulesCreated) {
            return res.status(400).json({ message: 'Missing schedulesCreated' });
          }
        console.log('updateSchedulesCreated', schedulesCreated)
        const newUser = await userOperation.updateSchedulesCreated({ id, schedulesCreated });
        res.status(201).json(newUser); // Retorna o novo usuário criado com o status 201 (Created)
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error }); // Retorna um erro 500 (Internal Server Error) em caso de falha
    }    
};

exports.updateSchedulesJoined = async (req, res) => {
    // Implementação da lógica para criar um usuário
    try {
        const { id } = req.params;
        const { schedulesJoined } = req.body; // Assume que os dados do usuário estão no corpo da solicitação
        if (!schedulesJoined) {
            return res.status(400).json({ message: 'Missing schedulesJoined' });
          }
        console.log('updateSchedulesJoined', schedulesJoined)
        const newUser = await userOperation.updateSchedulesJoined({ id, schedulesJoined });
        res.status(201).json(newUser); // Retorna o novo usuário criado com o status 201 (Created)
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error }); // Retorna um erro 500 (Internal Server Error) em caso de falha
    }    
};
exports.updateCalendar = async (req, res) => {
    // Implementação da lógica para criar um usuário
    try {
        const { id } = req.params;
        const { calendarInformation } = req.body; // Assume que os dados do usuário estão no corpo da solicitação
        if (!calendarInformation) {
            return res.status(400).json({ message: 'Missing calendarInformation' });
          }
        console.log('calendarInformation----------', calendarInformation)
        const newCalendar = await userOperation.updateCalendar({ id, calendarInformation });
        res.status(201).json(newCalendar); // Retorna o novo usuário criado com o status 201 (Created)
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error }); // Retorna um erro 500 (Internal Server Error) em caso de falha
    }    
};

exports.listCalendar = async (req, res) => {
    // Implementação da lógica para criar um usuário
    try {
        const { createdBy } = req.params;

        if (!createdBy) {
            return res.status(400).json({ message: 'Missing createdBy' });
          }
        console.log('create Calendar', createdBy)
        const calendars = await userOperation.listCalendar({ createdBy });
        res.status(201).json(calendars); // Retorna o novo usuário criado com o status 201 (Created)
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message }); // Retorna um erro 500 (Internal Server Error) em caso de falha
    }    
};

exports.getCalendar = async (req, res) => {
    // Implementação da lógica para criar um usuário
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Missing id' });
          }
        console.log('create Calendar', id)
        const calendars = await userOperation.getCalendar({ id });
        res.status(201).json(calendars); // Retorna o novo usuário criado com o status 201 (Created)
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message }); // Retorna um erro 500 (Internal Server Error) em caso de falha
    }    
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
