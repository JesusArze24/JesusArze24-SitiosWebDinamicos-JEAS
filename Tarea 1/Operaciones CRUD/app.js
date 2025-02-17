const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Configurar EJS como motor de plantillas
app.use(express.urlencoded({ extended: true }));// Para poder leer los datos de un formulario

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { nombres, apellidos, direccion, telefono } = req.body;
    db.query('INSERT INTO agenda (nombres, apellidos, direccion, telefono) VALUES (?, ?, ?, ?)', [nombres, apellidos, direccion, telefono], (error, resultado) => {
        if (error) {
            console.log('Error al guardar el producto');
            return;
    }
        res.redirect('/data');
    });
});

app.get('/data', (req, res) => {
    db.query('SELECT id, nombres, apellidos, direccion, telefono FROM agenda', (error, datos) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('data', { datos });
    });
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT id, nombres, apellidos, direccion, telefono FROM agenda WHERE id = ?', [id], (error, datos) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('edit', { dato: datos[0] });
    });
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { nombres, apellidos, direccion, telefono } = req.body;
    db.query('UPDATE agenda SET nombres = ?, apellidos = ?, direccion = ?, telefono = ? WHERE id = ?', [nombres, apellidos, direccion, telefono, id], (error, resultado) => {
        if (error) {
            console.log('Error al actualizar el producto');
            return;
        }
        res.redirect('/data');
    });
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM agenda WHERE id = ?', [id], (error, datos) => {
        if(error) {
            console.log('No se pudieron borrar los datos');
            return;
        }
        res.redirect('/data');
    }) 
})

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port} http://localhost:${port}`);
});