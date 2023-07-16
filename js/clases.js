class Producto{
    constructor(objProducto){
      this.id = objProducto.id;
      this.nombre = objProducto.title;
      this.precio = parseFloat(localStorage.getItem('moneda'))*objProducto.price;
      this.image = objProducto.image;
      this.descripcion = objProducto.description;
      this.categoria = objProducto.category;
      this.cantidad=objProducto.cantidad||1;
    }
  
    subtotal(){
      return this.precio*this.cantidad;
    }
    
    dibujar(articuloTarjeta){
      let cant = parseInt(getCantidad(this.id));
      const card = document.createElement('div');
      card.className='card col-md-3 col-sm-4 col-6';
      card.innerHTML=`
          <div class="card-body">
              <img src="${this.image}" height="100">
              <h5>${this.nombre}</h5>
              <p>${moneda(this.precio)}</p>
              <button onclick="carrito.sumar(${this.id})" class="btn btn-primary comprar">Comprar</button>
          </div>
      `;
      articuloTarjeta.appendChild(card);
    }
  }
  
  class Categoria{
    constructor(nombre){
      this.nombre=nombre
    }
  
    dibujar(articuloTarjeta){
      const card = document.createElement('div');
      card.className='card col-md-6 col-sm-6 col-6';
      card.innerHTML+=`
      <div class="card-body">
              <h5>${this.nombre}</h5>
              <button onclick="verProductos('${this.nombre}')" class="btn btn-primary comprar">Ver Productos</button>
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
          return this.productos.reduce((a,producto)=>a+getPrecio(producto.precio)*producto.cantidad,0);
      }
  
      sumar(idProducto){
        let producto_carrito = this.productos.find((p)=>p.id==idProducto)||false;
        // Verifica si está en el carrito
        if(!producto_carrito){
          let producto = elementos.find((i)=>i.id==idProducto);
          // Desestructuración de producto para guardar en local storage
          let {image,descripcion, ...r_producto} = producto;
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
  
      dibujarTabla(stock){
        let tabla = document.getElementById('carrito');
        tabla.innerHTML = '';
        // Cantidad total de productos en el carrito
        let cant = 0;
        this.productos.forEach((p,i)=>{
          cant +=p.cantidad;
          tabla.innerHTML += `
          <div class="row division">
            <div class="col-9">
              <h5>$${p.nombre} (${moneda(getPrecio(p.precio))} c/u)</h5>
              <button class="btn btn-danger" onclick="carrito.restar(${i})">-</button><input name="cantidad" value="${p.cantidad}"><button class="btn btn-success" onclick="carrito.sumar(${p.id})">+</button>
              </div>
            <div class="col-2">
              <h5>${moneda(p.cantidad*(getPrecio(p.precio)))}</h5>
              <p><button class="btn btn-danger" onclick="carrito.restar(${i},'todos')">Eliminar</button></p>
            </div>
          </div>`;
        });
        tabla.innerHTML+=`
          <div class="d-flex justify-content-end">
            <h4>TOTAL: ${localStorage.getItem('simbolo')} ${moneda(this.total(stock))}</h4>
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