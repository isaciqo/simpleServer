const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const errorHandler = require('./src/middlewares/errorHandler')
const cors = require('cors'); 

// Middleware CORS






const app = express();
const PORT = 3030;

mongoose.connect('mongodb://localhost:27017/mydataBase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/users', userRoutes);
// Usar outras rotas aqui
app.use(errorHandler); // Adicione o errorHandler aqui
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
