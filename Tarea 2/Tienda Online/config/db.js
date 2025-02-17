const mysql = require('mysql2');

const conection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bd_tienda'
});

conection.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos', err);
        return;
    }
    console.log('Conexion exitosa con la base de datos');
});

module.exports = conection;