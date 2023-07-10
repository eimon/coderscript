//Inicializar local storage
localStorage.getItem('moneda')||localStorage.setItem('moneda',1);
localStorage.getItem('simbolo')||localStorage.setItem('simbolo','🇺🇸');
let boton_moneda = document.getElementById('moneda');
boton_moneda.innerHTML = localStorage.getItem('simbolo');
//Inicializar variables
const carrito = new Carrito();
sessionStorage.getItem('vista')||sessionStorage.setItem('vista','categorias');
//Traer productos
renderizarTienda();

let busqueda = document.getElementById('buscar');
// busqueda.onclick(()=>{
//   buscar();
// })


let boton = document.getElementById('modo');
let interior_carrito = document.getElementsByClassName('modal-content')[0];
boton.onclick = () => {
  if (localStorage.getItem('mode')!='dark'){
    document.body.className = 'dark';
    boton.innerText = 'Light Mode';
    localStorage.setItem('mode','dark');
    interior_carrito.className = 'modal-content bg-dark';
  }else{
    document.body.className = 'light';
    boton.innerText = 'Dark Mode';
    localStorage.setItem('mode','light');
    interior_carrito.className = 'modal-content bg-light';
  }
}
if(localStorage.getItem('mode')=='dark'){
  document.body.className = 'dark';
  boton.innerText = 'Light Mode';
  interior_carrito.className = 'modal-content bg-dark';
}