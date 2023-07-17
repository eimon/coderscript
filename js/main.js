//Inicializar local storage
localStorage.getItem('moneda')||localStorage.setItem('moneda',1);
localStorage.getItem('simbolo')||localStorage.setItem('simbolo','🇺🇸');
let boton_moneda = document.getElementById('moneda');
boton_moneda.innerHTML = localStorage.getItem('simbolo');
//Inicializar variables
const carrito = new Carrito();
sessionStorage.setItem('vista','categorias');
//Traer productos
renderizarTienda();
carrito.dibujarTabla();


//Funciones de botones
let busqueda = document.getElementById('buscar');
busqueda.onclick = ()=>{
  buscar();
}

let boton_volver = document.getElementById('volver');
boton_volver.onclick = () => {
  volver();
}

let boton_finalizar = document.getElementById('finalizar');
boton_finalizar.onclick = () => {
  finalizar();
}

const productModal = document.getElementById('productModal')
if (productModal) {
  productModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const id = button.getAttribute('data-bs-id');
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.
    let producto = elementos.find((e)=>e.id==id);
    // Update the modal's content.
    const modalTitle = productModal.querySelector('.modal-title');
    const modalBody = productModal.querySelector('.modal-body');

    modalTitle.textContent = `${producto.nombre}`;
    modalBody.innerHTML = `
      <img src="${producto.image}" width="100%">
      <p>Descripción: ${producto.descripcion}</p>
      <p>Precio unitario: ${moneda(getPrecio(producto.precio))}</p>
    `;
  })
}