////////////////////////////////////////////////SCRIPT DE PRODUCTOS en index//////////////////////////////////

//funcion crear elementos
const crearImg = (src,title,alt,clase) => {
    let imgNueva = document.createElement('img');
    imgNueva.src = src;
    imgNueva.title = title;
    imgNueva.alt = alt;
    imgNueva.className = clase;

    return imgNueva;
}

//crear btn ver
const crearBtn = (prodid, clase, contenido) => {
    let btnNuevo = document.createElement('button');
    btnNuevo.className = clase;
    btnNuevo.textContent = contenido;
    btnNuevo.setAttribute('prodid',prodid);

    return btnNuevo;
}

//guardar producto a ver en local storage, para recuperar info en producto
function guardarProductoVer(idProducto) {
    let producto = arrayProductosDestacados.find(prod => prod.id == idProducto);
    localStorage.setItem('ProductoVer',JSON.stringify(producto));
}

//Objeto producto
class Producto {
    constructor(id,src,nombre,precio,detalles){
        this.id = id;
        this.src = src;
        this.nombre = nombre;
        this.precio = precio;
        this.detalles = detalles;
    }
}

//Arreglos de productos
    //productos destacados (solo 9)
    let arrayProductosDestacados = [
        (new Producto(1,'assets/images/shirt1.jpg','Remera Jiu Jitsu',60000,'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"')),
        (new Producto(2,'assets/images/running-shoes.png','Zapatillas Running',150000,'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"')),
        (new Producto(3,'assets/images/short.png','Short Training',70000,'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"')),
        (new Producto(4,'assets/images/shirt2.jpg','Remera Termica',50000,'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"')),
        (new Producto(5,'assets/images/shirt3.jpg','Remera Termica',70000,'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"')),
        (new Producto(6,'assets/images/short2.jpg','Short Training',30000,'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"')),
        (new Producto(7,'assets/images/short3.webp','Short Training',50000,'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"')),
        (new Producto(8,'assets/images/tobillera.jpg','Tobillera',70000,'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"')),
        (new Producto(9,'assets/images/headband.webp','Vincha',30000,'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"')),
    ];

//Crear e insertar productos destacados
let destacados = document.querySelector('.destacados'); //espacio vacio en html
let fragmentoDestacados = document.createDocumentFragment(); //fragmento con la info de productos destacados

for (let i = 0; i < 3; i++) {

    let rowDestacados = document.createElement('div'); //creacion de filas
    rowDestacados.className = 'row-destacados';

    fragmentoDestacados.appendChild(rowDestacados);

    let contadorProds = i * 3; //manejo de posiciones en array de productos destacados

    for (let e = contadorProds; e < (contadorProds + 3); e++) {

        //desestructuracion del producto
        let {id,src,nombre,precio,stock} = arrayProductosDestacados[e];

        let producto = document.createElement('div'); //creacion de containers con productos con atributo 'prodid' para facilitar su manejo en js
        producto.className = 'articulo-destacado-container';

        let fragmentoProducto = document.createDocumentFragment(); //fragmento de productos
        let imgProducto = crearImg(src,`Comprar ${nombre}`,nombre,'articulo-destacado');
        let h3Producto = document.createElement('h3');
        h3Producto.textContent = nombre;
        let h4Producto = document.createElement('h4');
        h4Producto.textContent = precio;
        let enlaceProducto = document.createElement('a');
        enlaceProducto.href = 'pages/producto.html';
        let btnComprar = crearBtn(id,'btnComprar','Ver +');
        enlaceProducto.appendChild(btnComprar);

        btnComprar.addEventListener('click',()=>{
            guardarProductoVer(btnComprar.getAttribute('prodid'));
        });

        fragmentoProducto.appendChild(imgProducto);
        fragmentoProducto.appendChild(h3Producto);
        fragmentoProducto.appendChild(h4Producto);
        fragmentoProducto.appendChild(enlaceProducto);
        producto.appendChild(fragmentoProducto); //insertar fragmento de producto en un container
        rowDestacados.appendChild(producto);//insertar producto en fila
    }
}
destacados.appendChild(fragmentoDestacados); //insertar fragmento con productos destacados en el container destacados