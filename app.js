const express = require('express');
const mongoose = require('mongoose');
const routerRegister = require('./src/intergaces/html/presentation/RouterRegister.js');
const errorHandler = require('./src/intergaces/html/middlewares/errorHandler')
const cors = require('cors'); 

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
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));
routerRegister(app);
app.use(errorHandler); // Adicione o errorHandler aqui

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
