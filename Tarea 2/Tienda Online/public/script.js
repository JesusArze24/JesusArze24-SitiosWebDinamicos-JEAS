//Alert que sale en la raiz (página principal)
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/') {
      alert('El CRUD de los productos esta en el header de la pagina en el link ADMINISTRADOR');
    }
  });

//Cambiar de imagen para cada producto en la pagina principal
document.addEventListener('DOMContentLoaded', () => {
    const productos = document.querySelectorAll('#productos .producto img');

    const imagenesAlternativas = [
        ['/Images/Producto1-1.png', '/Images/Producto1-2.png'],
        ['/Images/Producto2-1.png', '/Images/Producto2-2.png'],
        ['/Images/Producto3-1.png', '/Images/Producto3-2.png'],
        ['/Images/Producto5-1.png', '/Images/Producto5-2.png'],
        ['/Images/Producto7-1.png', '/Images/Producto7-2.png'],
        ['/Images/Producto10-1.png', '/Images/Producto10-2.png'],
        ['/Images/Producto6-1.png', '/Images/Producto6-2.png'],
        ['/Images/Producto4-1.png', '/Images/Producto4-2.png', '/Images/Producto4-3.png'],
    ];

    productos.forEach((img, index) => {
        let contador = 0;
        setInterval(() => {
            img.style.opacity = '0';
            setTimeout(() => {
                contador = (contador + 1) % imagenesAlternativas[index].length;
                img.src = imagenesAlternativas[index][contador];
                img.style.opacity = '1';
            }, 700);
        }, 3500);

    });
});

//---------------------------------modal-----------------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const imagenModal = document.getElementById('imagen-modal');
    const cerrarModal = document.querySelector('.cerrar');
    const imagen = document.getElementById('imagen-detalle');

    if (imagen) {
        imagen.addEventListener('click', () => {
            console.log("putaaaaaaaaa");
            imagenModal.src = imagen.src;
            modal.style.display = 'flex';
        });
    }

    cerrarModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

//Scroll horizontal
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scrollLeftButton = document.getElementById('scroll-left');
    const scrollRightButton = document.getElementById('scroll-right');

    scrollLeftButton.addEventListener('click', () => {
        grid.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    scrollRightButton.addEventListener('click', () => {
        grid.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
});

