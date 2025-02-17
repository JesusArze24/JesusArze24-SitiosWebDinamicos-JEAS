const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const productosRoutes = require("./routes/productRoutes");

const app = express();

const port = 3000;
// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');
// Middleware para archivos estáticos
app.use(express.static('public'));
// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));
// Ruta de inicio
app.get('/', (req, res) => {
    db.query('SELECT id, nombre, precio, imagen, descripcion FROM productos', (err, productos) => {
        if (err) {
            console.error('Error al obtener los productos', err);
            return;
        }
        res.render('index', { productos });
    });
});

app.use("/productos", productosRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
