// Función listado para mostrar en el prompt de usuario
function getListado(lista){
    const c = [];
    let i = 1;
    for(const item of lista){
        c.push(String(i)+'- '+item.nombre);
        i=++i;
    }
    return c;
}

//Clase para acumular productos
class Carrito{
    constructor(){
        this.subtotal=0;
        this.productos = [];
    }

    sumar(producto){
        //Agregar al array de productos de la instancia
        this.productos.push(producto);
        //Acumular subtotal y devolver el mismo
        return this.subtotal += producto.precio;
    }

    anular(idProducto){
        //Verifica si existe en el array
        if(this.productos[idProducto]){
            //Elimina el producto del array y lo almaceno para mostrarlo en consola
            let anulado = this.productos.splice(idProducto,1);
            //Calcula nuevamente el subtotal
            this.subtotal = carrito.productos.reduce((a,productos)=>a+productos.precio,0);
            console.log('Anulado '+anulado[0].nombre+': -$'+anulado[0].precio+'\nSubtotal: $'+this.subtotal);}
        else
            console.log('Opción no válida. Anulación cancelada');
    }

    getTotal(){
        return this.subtotal;
    }
}

//Carga de productos
const productos = {
    "categorias": [
      {
        "nombre": "Granos",
        "productos": [
          {
            "nombre": "Arroz",
            "precio": 2.5
          },
          {
            "nombre": "Frijoles",
            "precio": 1.99
          },
          {
            "nombre": "Lentejas",
            "precio": 3.25
          },
          {
            "nombre": "Quinoa",
            "precio": 4.99
          },
          {
            "nombre": "Harina de trigo",
            "precio": 2.0
          }
        ]
      },
      {
        "nombre": "Aceites y condimentos",
        "productos": [
          {
            "nombre": "Aceite de oliva",
            "precio": 5.99
          },
          {
            "nombre": "Vinagre balsámico",
            "precio": 3.5
          },
          {
            "nombre": "Sal marina",
            "precio": 1.75
          },
          {
            "nombre": "Pimienta negra",
            "precio": 2.25
          },
          {
            "nombre": "Salsa de soja",
            "precio": 2.99
          }
        ]
      },
      {
        "nombre": "Lácteos",
        "productos": [
          {
            "nombre": "Leche",
            "precio": 1.99
          },
          {
            "nombre": "Queso cheddar",
            "precio": 3.75
          },
          {
            "nombre": "Yogur natural",
            "precio": 2.25
          },
          {
            "nombre": "Mantequilla",
            "precio": 2.5
          },
          {
            "nombre": "Crema de leche",
            "precio": 1.75
          }
        ]
      },
      {
        "nombre": "Panadería",
        "productos": [
          {
            "nombre": "Pan",
            "precio": 1.49
          },
          {
            "nombre": "Pan integral",
            "precio": 1.99
          },
          {
            "nombre": "Croissant",
            "precio": 0.99
          },
          {
            "nombre": "Baguette",
            "precio": 1.75
          },
          {
            "nombre": "Muffin de arándanos",
            "precio": 1.25
          }
        ]
      },
      {
        "nombre": "Endulzantes",
        "productos": [
          {
            "nombre": "Azúcar",
            "precio": 3.25
          },
          {
            "nombre": "Miel",
            "precio": 4.99
          },
          {
            "nombre": "Stevia",
            "precio": 2.75
          },
          {
            "nombre": "Jarabe de arce",
            "precio": 6.5
          },
          {
            "nombre": "Panela",
            "precio": 2.25
          }
        ]
      }
    ]
}

//Instancia de carrito
const carrito = new Carrito();
let opcion = 0;
do{
    opcion = parseInt(prompt('Seleccione una opción\n1- Búsqueda manual\n2- Búsqueda por categorías\n3- Anular producto\n0- Finalizar'));
    switch(opcion){
        //Búsqueda por texto
        case 1:
            let busqueda = prompt('Ingrese el nombre del producto:');
            let resultado = '';
            //Se crea un array con todos los productos
            let productosDisponibles = productos.categorias.flatMap((categoria) => categoria.productos);
            resultado = productosDisponibles.filter((producto)=>producto.nombre.toLowerCase()==busqueda.toLowerCase())
            if(resultado.length){
                console.log(resultado[0].nombre+': $'+resultado[0].precio+'\nSubtotal: $'+carrito.sumar(resultado[0]));
            }
            else
                console.log('No se encontró el producto.');
            break;
        //Búsqueda iterando por categoría y luego por productos de la misma
        case 2:
            let idCategoria = 0;
            do{
                let idProducto = 0;
                idCategoria = parseInt(prompt('Seleccione una categoría\n'+getListado(productos.categorias).join('\n')+'\n0- Salir'));
                if(productos.categorias[idCategoria-1]){
                    let categoria = productos.categorias[idCategoria-1];
                    idProducto = parseInt(prompt('Seleccione un producto\n'+getListado(categoria.productos).join('\n')));
                    if(categoria.productos[idProducto-1]){
                        let producto = categoria.productos[idProducto-1];
                        console.log(producto.nombre+': $'+producto.precio+'\nSubtotal: $'+carrito.sumar(producto));
                    }else
                        console.log('Opción no válida');
                }
            }while(idCategoria!=0);
            break;
        case 3:
            let anular = 0;
            anular = parseInt(prompt('Seleccione un producto para anular:\n'+getListado(carrito.productos).join('\n')));
            carrito.anular(anular-1);
            break;
    }
}while(opcion!=0);

alert('El total es $'+carrito.getTotal());