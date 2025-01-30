const mysql = require('mysql2');

const conection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'bd_agenda'
});

conection.connect((err) => {
    if (err) {
        console.error('Error de conexion', err);
        return;
    }
    console.log('Conexion exitosa con la base de datos');
});

module.exports = conection;