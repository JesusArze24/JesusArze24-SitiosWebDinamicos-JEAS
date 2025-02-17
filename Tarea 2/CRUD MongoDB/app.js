const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Cliente = require('./models/Cliente');

const app = express();

// Configuración
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Para soportar PUT y DELETE
app.set('view engine', 'ejs');


// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/clientes', {
});

// Rutas
app.get('/', async (req, res) => {
    const clientes = await Cliente.find( );
    res.render('index', { clientes });
});
// Ruta para renderizar la página create
app.get('/new', (req, res) => {
    res.render('create');
});
// Ruta para crear un nuevo cliente
app.post('/create', async (req, res) => {
    const { ci, nombres, apellidos, celular, correo} = req.body;
    await Cliente.create({ ci, nombres, apellidos, celular, correo });
    res.redirect('/');
});
//Ruta para renderizar la página edit
app.get('/edit/:id', async (req, res) => {
    const cliente = await Cliente.findById(req.params.id);
    res.render('edit', { cliente });
});
//Ruta para editar un cliente
app.put('/edit/:id', async (req, res) => {
    const { ci, nombres, apellidos, celular, correo} = req.body;
    await Cliente.findByIdAndUpdate(req.params.id, { ci, nombres, apellidos, celular, correo });
    res.redirect('/');
});
//Ruta para eliminar un cliente
app.delete('/delete/:id', async (req, res) => {
    await Cliente.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

//Ruta para mostrar
app.get("/show/:id", async(req, res)=>{
    const cliente = await Cliente.findById(req.params.id);
    res.render('show', { cliente });
})

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
