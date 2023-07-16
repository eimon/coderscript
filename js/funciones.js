function moneda(precio){
    if(localStorage.getItem('moneda')=='500'){
      return ArsPeso.format(precio);
    }
    else{
      return USDollar.format(precio);
    }
}

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

let ArsPeso = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});

async function renderizarTienda(categoria=null){
  let articuloTarjeta = document.getElementById('tarjeta');
  articuloTarjeta.innerHTML = '';
  switch(sessionStorage.getItem('vista')){
    case 'categorias':
      articuloTarjeta.innerHTML='<h2>Categorías:</h2>';
      let data1 = await
      fetch('https://fakestoreapi.com/products/categories');
      let categorias = await data1.json();
      elementos = categorias.map((categoria)=>new Categoria(categoria));
      break;
    case 'productos':
      let data = await
      fetch(`https://fakestoreapi.com/products/category/${categoria}`);
      let stock = await data.json();
      articuloTarjeta.innerHTML=`<h2>Productos de ${categoria}:</h2>`;
      elementos = stock.map((producto)=>new Producto(producto));
      break;
    default:
      articuloTarjeta.innerHTML=`<h2>Resultado de la búsqueda:</h2>`;
      elementos = todos.filter((p)=>p.nombre.toLowerCase()==sessionStorage.getItem('busqueda').toLowerCase());
      break;
    }
    elementos.forEach((elemento)=>elemento.dibujar(articuloTarjeta));
    // carrito.dibujarTabla(stock);
}

function getPrecio(precio){
  return precio*parseFloat(localStorage.getItem('moneda'));
}

function getCantidad(idProducto){
  return carrito.productos.find((p)=>p.id==idProducto)?.cantidad||0;
}

function verProductos(categoria){
  sessionStorage.setItem('vista','productos');
  sessionStorage.setItem('categoria',categoria);
  renderizarTienda(categoria);
  // Botón volver
  document.getElementById('volver').style.display = 'inline';
}

function volver(){
  sessionStorage.setItem('vista','categorias');
  dibujarTarjetas();
  //ocultar botón
  document.getElementById('volver').style.display = 'none';
}

function buscar(){
  sessionStorage.setItem('vista','busqueda');
  sessionStorage.setItem('busqueda',prompt('Búsqueda de producto:'));
  dibujarTarjetas();
  // Boton volver
  document.getElementById('volver').style.display = 'inline';
}

function cambiarMoneda(){
  if(localStorage.getItem('moneda')!='500'){
    localStorage.setItem('moneda','500');
    localStorage.setItem('simbolo','🇦🇷');
  }else{
    localStorage.setItem('moneda','1');
    localStorage.setItem('simbolo','🇺🇸');
  }
  location.reload();
}
function error(mensaje){
  document.getElementById('tarjeta').innerHTML = `<h2>${mensaje}</h2>`;
}