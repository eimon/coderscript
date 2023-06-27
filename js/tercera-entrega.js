// FUNCIONES GENERALES
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

function getPrecio(idProducto){
  let precio = 0;
  stock.categorias.forEach((cat)=>{
    let producto = cat.productos.find((prod)=>prod.id==idProducto);
    if (producto){
      precio = producto.precio;
    };
  })
  return precio*parseFloat(localStorage.getItem('moneda'));
}

// TO-DO: función que actualice todas las cantidades
// function getCantidad(idProducto){
//   return parseInt(carrito.productos.find((p)=>p.id==idProducto).cantidad);
// }

function dibujarTarjetas(categoria=null){  
  let articuloTarjeta = document.getElementById('tarjeta');
  switch(sessionStorage.getItem('vista')){
    case 'categorias':
      articuloTarjeta.innerHTML='<h2>Categorías:</h2>';
      elementos = stock.categorias.map((categoria) => new Categoria(categoria));
      break;
    case 'productos':
      articuloTarjeta.innerHTML=`<h2>Productos de ${stock.categorias[categoria-1].nombre}:</h2>`;
      elementos = stock.categorias[categoria-1].productos.map((producto)=>new Producto(producto));
    break;
    default:
      articuloTarjeta.innerHTML=`<h2>Todos los productos:</h2>`;
      elementos = todos;
      break;
  }

  elementos.forEach((elemento)=>elemento.dibujar(articuloTarjeta));
}

function verProductos(idCategoria){
  sessionStorage.setItem('vista','productos');
  dibujarTarjetas(idCategoria);
  // Botón volver
  document.getElementById('volver').style.display = 'inline';
}

function volver(){
  sessionStorage.setItem('vista','categorias');
  dibujarTarjetas();
  //ocultar botón
  document.getElementById('volver').style.display = 'none';
}

function verTodos(){
  sessionStorage.setItem('vista','todos');
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

// CLASES

class Producto{
  constructor(objProducto){
    this.id=objProducto.id;
    this.nombre=objProducto.nombre;
    this.precio=parseFloat(localStorage.getItem('moneda'))*objProducto.precio;
    this.cantidad=objProducto.cantidad||1;
  }

  subtotal(){
    return this.precio*this.cantidad;
  }
  
  dibujar(articuloTarjeta){
    const card = document.createElement('div');
    card.className='card col-md-3 col-sm-4 col-6';
    card.innerHTML=`
        <div class="card-body">
            <h5>${this.nombre}</h5>
            <p>${moneda(this.precio)}</p>
            <button onclick="carrito.sumar(${this.id})" class="btn btn-primary comprar">Comprar</button>
        </div>
    `;
    articuloTarjeta.appendChild(card);
  }

}

class Categoria{
  constructor(objCategoria){
    this.id=objCategoria.id,
    this.nombre=objCategoria.nombre,
    this.productos=objCategoria.productos
  }

  dibujar(articuloTarjeta){
    const card = document.createElement('div');
    card.className='card col-md-6 col-sm-6 col-6';
    card.innerHTML+=`
    <div class="card-body">
            <h5>${this.nombre}</h5>
            <p>Cantidad de productos: ${this.productos.length}</p>
            <button onclick="verProductos(${this.id})" class="btn btn-primary comprar">Ver Productos</button>
    </div>
    `;
    articuloTarjeta.appendChild(card);
  }
}
//Clase para acumular productos
class Carrito{
    constructor(){
        this.productos = JSON.parse(localStorage.getItem('productos'))?.map((producto)=>producto)|| [];
    }
    
    total(){
        return this.productos.reduce((a,productos)=>a+getPrecio(productos.id)*productos.cantidad,0);
    }

    setCant(idProductoCarrito,cant){
      this.productos[idProductoCarrito].cantidad=parseInt(cant);
    }

    sumar(idProducto){
      let producto_carrito = this.productos.find((p)=>p.id==idProducto)||false;
      // Verifica si está en el carrito
      if(!producto_carrito){
        let producto = elementos.find((i)=>i.id==idProducto);
        // Desestructuración de producto para guardar en local storage
        let {precio, ...r_producto} = producto;
        this.productos.push(r_producto);
      }else{
        // Si existe, aumenta la cantidad
        producto_carrito.cantidad+=1;
      }
      // Guarda el carrito en local storage
      localStorage.setItem('productos',JSON.stringify(this.productos));
      // Vuelve a dibujar la tabla
      this.dibujarTabla(document.getElementById('carrito'));
    }

    dibujarTabla(tabla){
      tabla.innerHTML = '';
      let cant = 0;
      this.productos.forEach((p,i)=>{
        cant +=p.cantidad;
        tabla.innerHTML += `
        <div class="row division">
          <div class="col-9">
            <h5>$${p.nombre} (${moneda(getPrecio(p.id))} c/u)</h5>
            <button class="btn btn-danger" onclick="carrito.restar(${i})">-</button><input name="cantidad" value="${p.cantidad}"><button class="btn btn-success" onclick="carrito.sumar(${p.id})">+</button>
            </div>
          <div class="col-2">
            <h5>${moneda(p.cantidad*getPrecio(p.id))}</h5>
            <p><button class="btn btn-danger" onclick="carrito.restar(${i},'todos')">Eliminar</button></p>
          </div>
        </div>`;
      });
      tabla.innerHTML+=`
        <div class="d-flex justify-content-end">
          <h4>TOTAL: ${localStorage.getItem('simbolo')} ${moneda(this.total())}</h4>
        </div>
        `;
      document.getElementById('cantidad').innerHTML = cant;
    }

    restar(idProductoCarrito,limpiar=false){
      // Setea cantidad en 1 para que luego se elimine
      limpiar&&(this.productos[idProductoCarrito].cantidad=1);
      // Resta 1 a la cantidad y si devuelve 0, lo saca del arreglo
      (this.productos[idProductoCarrito].cantidad+=-1)>0||this.productos.splice(idProductoCarrito,1);
      localStorage.setItem('productos',JSON.stringify(this.productos));
      this.dibujarTabla(document.getElementById('carrito'));
    }
}


// Acá empieza el código
localStorage.getItem('moneda')||localStorage.setItem('moneda',1);
let boton_moneda = document.getElementById('moneda');
boton_moneda.innerHTML = localStorage.getItem('simbolo')||localStorage.setItem('simbolo','🇺🇸');
//Instancia de carrito
const carrito = new Carrito();
carrito.dibujarTabla(document.getElementById('carrito'));

// TO-DO: Actualizar carrito con cantidades desde un form (agregar método de CLASE)
// let form_carrito = document.getElementById('form_carrito');
// form_carrito.addEventListener("keypress", function(event) {
//   if (event.key === "Enter") {
//     // Prevenir el evento por defecto
//     event.preventDefault();
//     // Función de actualización
//   }
// });


let todos = stock.categorias.flatMap((categoria) => categoria.productos.map((producto)=>new Producto(producto)));
sessionStorage.setItem('vista','categorias');
let elementos = [];

dibujarTarjetas();


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
  boton.innerText = 'Light Mode'
  // localStorage.setItem('mode','dark');
}