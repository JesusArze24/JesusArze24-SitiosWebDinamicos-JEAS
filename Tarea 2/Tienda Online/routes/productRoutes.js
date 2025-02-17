const express = require("express");
const router = express.Router();
const db = require('../config/db');

// Página para modificar los productos
router.get("/admin", (req, res) => {
  db.query('SELECT * FROM productos', (err, productos) => {
    if (err) {
        console.error('Error al obtener los productos', err);
        return;
    }
    res.render('admin', { productos });
  });
});

//Renderizar la pagina para editar un producto
router.get("/editar/:id", async (req, res) => {
  const [productos] = await db.promise().query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
  if (productos.length === 0) {
    return res.status(404).send('Producto no encontrado');
  }
  res.render('editar', { producto: productos[0] });
});

// Actualizar el producto en la base de datos
router.post("/editar/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio, imagen } = req.body;
  db.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, imagen = ? WHERE id = ?', [nombre, descripcion, precio, imagen, id], (error) => {
      if (error) {
          console.log('Error al actualizar el producto');
          return;
      }
      res.redirect('/productos/admin');
  });
});

//Renderizar la pagina para añadir un producto
router.get("/crear", async (req, res) => {
  res.render('crear');
});

//Anadir producto a la base de datos
router.post("/crear", (req, res) => {
  const { nombre, descripcion, precio, imagen } = req.body;
  db.query('INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, imagen], (error) => {
      if (error) {
          console.log('Error al añadir el producto');
          return;
      }
      res.redirect('/productos/admin');
  });
});

//Eliminar producto de la base de datos
router.get("/eliminar/:id", (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM productos WHERE id =?',[id], (error) => {
      if (error) {
          console.log('Error al eliminar el proyecto');
          return;
      }
      res.redirect('/productos/admin');
  });
});

// Renderizar cada prodcuto
router.get('/producto/:id', async (req, res) => {
  const [productos] = await db.promise().query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
  if (productos.length === 0) {
    return res.status(404).send('Producto no encontrado');
  }
  res.render('producto', { producto: productos[0]});
});

//Añadir por

module.exports = router;
