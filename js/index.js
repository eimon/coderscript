let total = 0;
const sumar = (precio) => total = total + precio;

do{
    categoria = parseInt(prompt('Seleccione una categoría\n1- Frutas\n2- Verdura\n3- Limpieza\n0- Salir'));
    switch(categoria){
        case 1:
            switch (parseInt(prompt('Seleccione un producto\n1- Banana\n2- Manzana\n3- Naranja\n4- Tomate\n5- Pera\nOtro - Volver'))){
                case 1:
                    console.log('Banana: $200\nSubtotal: $'+sumar(200));
                    break;
                case 2:
                    console.log('Manzana: $300\nSubtotal: $'+sumar(300));
                    break;
                case 3:
                    console.log('Naranja: $250\nSubtotal: $'+sumar(250));
                    break;
                case 4:
                    console.log('Tomate: $900\nSubtotal: $'+sumar(900));
                    break;
                case 5:
                    console.log('Pera: $450\nSubtotal: $'+sumar(450));
                    break;
                default:
                    console.log('Subtotal: $'+sumar(0));
            }
            break;
        case 2:
            switch(parseInt(prompt('Seleccione un producto\n1- Lechuga\n2- Papa\n3- Batata\n4- Zapallo\n5- Rúcula\n6- Remolacha\nOtro - Volver'))){
                case 1:
                    console.log('Lechuga: $150\nSubtotal: $'+sumar(150));
                    break;
                case 2:
                    console.log('Papa: $120\nSubtotal: $'+sumar(120));
                    break;
                case 3:
                    console.log('Batata: $85\nSubtotal: $'+sumar(85));
                    break;
                case 4:
                    console.log('Zapallo: $400\nSubtotal: $'+sumar(400));
                    break;
                case 5:
                    console.log('Rúcula: $170\nSubtotal: $'+sumar(170));
                    break;
                case 6:
                    console.log('Remolacha: $110\nSubtotal: $'+sumar(110));
                    break;
                default:
                    console.log('Subtotal: $'+sumar(0));
            };
            break;
        case 3:
            switch(parseInt(prompt('Seleccione un producto\n1- Lavandina\n2- Desodorante p/piso\n3- Trapo de piso\n4- Detergente\n5- Esponja\n6- Jabón blanco\nOtro - Volver'))){
                case 1:
                    console.log('Lavandina: $275\nSubtotal: $'+sumar(275));
                    break;
                case 2:
                    console.log('Desodorante p/piso: $350\nSubtotal: $'+sumar(350));
                    break;
                case 3:
                    console.log('Trapo de piso: $225\nSubtotal: $'+sumar(225));
                    break;
                case 4:
                    console.log('Detergente: $500\nSubtotal: $'+sumar(500));
                    break;
                case 5:
                    console.log('Esponja: $220\nSubtotal: $'+sumar(220));
                    break;
                case 6:
                    console.log('Jabón blanco: $190\nSubtotal: $'+sumar(190));
                    break;
                default:
                    console.log('Subtotal: $'+sumar(0));
            };
            break;
        case 0:
            break;
        default:
            alert('No eligió una opción válida');
    }
}while(categoria!=0);
alert('El total es $'+total);