let boton = document.getElementById('modo');
let interior_carrito = document.getElementsByClassName('modal-content')[0];
let interior_producto = document.getElementsByClassName('modal-content')[1];
boton.onclick = () => {
  if (localStorage.getItem('mode')!='dark'){
    document.body.className = 'dark';
    boton.innerText = 'Light Mode';
    localStorage.setItem('mode','dark');
    interior_carrito.className = 'modal-content bg-dark';
    interior_producto.className = 'modal-content bg-dark';
  }else{
    document.body.className = 'light';
    boton.innerText = 'Dark Mode';
    localStorage.setItem('mode','light');
    interior_carrito.className = 'modal-content bg-light';
    interior_producto.className = 'modal-content bg-light';
  }
}
if(localStorage.getItem('mode')=='dark'){
  document.body.className = 'dark';
  boton.innerText = 'Light Mode';
  interior_carrito.className = 'modal-content bg-dark';
  interior_producto.className = 'modal-content bg-dark';
}