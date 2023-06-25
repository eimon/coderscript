function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

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

function getCantidad(idProducto){
  return parseInt(carrito.productos.find((p)=>p.id==idProducto).cantidad);
}

function dibujarTarjetas(categoria=null){  
  let articuloTarjeta = document.getElementById('tarjeta');
  if(sessionStorage.getItem('vista')=='categorias'){
    articuloTarjeta.innerHTML='<h2>Categorías:</h2>';
    elementos = stock.categorias.map((categoria) => new Categoria(categoria));
  }
  else if(sessionStorage.getItem('vista')=='productos'){
    articuloTarjeta.innerHTML=`<h2>Productos de ${stock.categorias[categoria-1].nombre}:</h2>`;
    elementos = stock.categorias[categoria-1].productos.map((producto)=>new Producto(producto));
  }
  else{
    articuloTarjeta.innerHTML=`<h2>Todos los productos:</h2>`;
    elementos = todos;
  }

  elementos.forEach((elemento)=>elemento.dibujar(articuloTarjeta));
}

function verProductos(idCategoria){
  sessionStorage.setItem('vista','productos');
  dibujarTarjetas(idCategoria);
}

function volver(){
  sessionStorage.setItem('vista','categorias');
  dibujarTarjetas();
}

function verTodos(){
  sessionStorage.setItem('vista','todos');
  dibujarTarjetas();
}

function cambiarMoneda(){
  if(localStorage.getItem('moneda')!='500'){
    localStorage.setItem('moneda','500');
    localStorage.setItem('simbolo','AR$');
  }else{
    localStorage.setItem('moneda','1');
    localStorage.setItem('simbolo','U$D');
  }
  location.reload();
}

class Producto{
  constructor(objProducto){
    this.id=objProducto.id;
    this.nombre=objProducto.nombre;
    this.precio=financial(parseFloat(localStorage.getItem('moneda'))*objProducto.precio);
    this.cantidad=objProducto.cantidad||1;
  }

  subtotal(){
    return this.precio*getCantidad(this.id);
  }
  
  dibujar(articuloTarjeta){
    const card = document.createElement('div');
    card.className='card col-md-3 col-sm-4 col-6';
    card.innerHTML=`
        <div class="card-body">
            <h2>${this.nombre}</h2>
            <p>$ ${this.precio}</p>
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
    card.className='card col-md-3 col-sm-4 col-6';
    card.innerHTML+=`
    <div class="card-body">
            <h2>${this.nombre}</h2>
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
        this.fecha = new Date();
        console.log('Ticket de compra\nFecha: '+this.fecha.toLocaleDateString()+'\nHora: '+this.fecha.toLocaleTimeString());
    }
    
    total(){
        return financial(this.productos.reduce((a,productos)=>a+getPrecio(productos.id)*getCantidad(productos.id),0));
    }

    sumar(idProducto){
      // Busca el producto en el carrito y si lo encuentra, suma uno. de no existir, crea un nuevo producto
      if(!this.productos.find((p)=>p.id==idProducto)){
        let producto = elementos.find((i)=>i.id==idProducto);
        let {precio, ...r_producto} = producto;
        this.productos.push(r_producto);
      }else{
        this.productos.find((p)=>p.id==idProducto).cantidad+=1;
      }
      localStorage.setItem('productos',JSON.stringify(this.productos));
      this.dibujarTabla(document.getElementById('carrito'));
    }

    dibujarTabla(tabla){
      tabla.innerHTML = '';
      this.productos.forEach((p)=>{
        tabla.innerHTML += `
        <tr>
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${getPrecio(p.id)}</td>
        <td>${getCantidad(p.id)}</td>
        <td>${getCantidad(p.id)*getPrecio(p.id)}</td>
      </tr>`;
      });
      tabla.innerHTML+=`<tr><td colspan="4">TOTAL: ${localStorage.getItem('simbolo')||'U$D'} ${this.total()}</td></tr>`;
    }

    restar(idProducto){
      // Busca el índice del producto en el array
      let id = indexOf(this.productos.find((p)=>p.id==idProducto));
      // Resta 1 a la cantidad y si devuelve 0, lo saca del arreglo
      this.productos[id].sub()||this.productos.splice(id,1);
      localStorage.setItem('productos',JSON.stringify(this.productos));
    }
}

//Instancia de carrito
const carrito = new Carrito();
carrito.dibujarTabla(document.getElementById('carrito'));
localStorage.getItem('moneda')||localStorage.setItem('moneda',1);
// localStorage.getItem('simbolo')||localStorage.setItem('simbolo','U$D');
let todos = stock.categorias.flatMap((categoria) => categoria.productos.map((producto)=>new Producto(producto)));
sessionStorage.setItem('vista','categorias');
let simbolo = localStorage.getItem('simbolo');
let elementos = [];

dibujarTarjetas();


let boton = document.getElementById('modo');
boton.onclick = () => {
  if (localStorage.getItem('mode')!='dark'){
    document.body.className = 'dark';
    boton.innerText = 'Light Mode'
    localStorage.setItem('mode','dark');
  }else{
    document.body.className = 'light';
    boton.innerText = 'Dark Mode';
    localStorage.setItem('mode','light');
  }
}

if(localStorage.getItem('mode')=='dark'){
  document.body.className = 'dark';
  boton.innerText = 'Light Mode'
  // localStorage.setItem('mode','dark');
}