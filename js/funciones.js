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
      let data2 = await
      fetch(`https://fakestoreapi.com/products/category/${categoria}`);
      let stock = await data2.json();
      articuloTarjeta.innerHTML=`<h2>${categoria.replace(/%20/g,' ').toUpperCase()}:</h2>`;
      elementos = stock.map((producto)=>new Producto(producto));
      break;
    default:
      let data3 = await
      fetch(`https://fakestoreapi.com/products/`);
      let todos = await data3.json();
      articuloTarjeta.innerHTML=`<h2>Resultado de la búsqueda "${sessionStorage.getItem('busqueda')}":</h2>`;
      busqueda = todos.filter((p)=>p.title.toLowerCase().includes(sessionStorage.getItem('busqueda').toLowerCase()));
      elementos = busqueda.map((producto)=>new Producto(producto));
      break;
    }
    elementos.forEach((elemento)=>elemento.dibujar(articuloTarjeta));
    // carrito.dibujarTabla(stock);
}

function getPrecio(precio){
  return precio*parseFloat(localStorage.getItem('moneda'));
}

function verProductos(categoria){
  sessionStorage.setItem('vista','productos');
  renderizarTienda(categoria);
  // Botón volver
  document.getElementById('volver').style.display = 'inline';
}

function volver(){
  sessionStorage.setItem('vista','categorias');
  renderizarTienda();
  //ocultar botón
  document.getElementById('volver').style.display = 'none';
}

function buscar(){
  sessionStorage.setItem('vista','busqueda');
  sessionStorage.setItem('busqueda',prompt('Búsqueda de producto:'));
  renderizarTienda();
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

function finalizar(){
  if(carrito.total()>0){
    Swal.fire({
      icon: 'warning',
      title: 'La compra va a finalizar',
      text: '¿Desea continuar?',
      showCancelButton: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.removeItem('productos');
        Swal.fire('¡Gracias por su compra!', '', 'success')
        .then((res) => {
          location.reload()
        })
      }
    })
  }
}