/////////////////////////Manejo de pagina de ver + de un producto

//variables de pagina ver producto
let productoDetallesImg = document.querySelector('.productoDetalles-img-container');
let productoDetallesInfo = document.querySelector('.productoDetalles-descripcion-container');
let producto = JSON.parse(localStorage.getItem('ProductoVer'));
let agregarBtn = document.querySelector('.productoDetalles-descripcion-comprar');

//crear img de producto
function crearImgProdDetalles() {
    let fragmento = document.createDocumentFragment();
    let img = document.createElement('img');
    
    img.src = `../${producto.src}`;
    img.alt = producto.nombre;
    img.className = 'imgProdVer';

    fragmento.appendChild(img);
    productoDetallesImg.appendChild(fragmento);
}

//cargar info de producto
function cargarInfoProducto() {
    let title = document.querySelector('.productoDetalles-descripcion-title');

    if (title){
        title.textContent = producto.nombre;

        let info = document.querySelector('.productoDetalles-descripcion-info');
        info.textContent = producto.detalles;

        let precio = document.querySelector('.productoDetalles-descripcion-precio');
        precio.textContent = `$ ${producto.precio}`;
    }
}

//agregar un producto al carrito de compras, creando si no existe o agregando si ya existe
function agregarProducto() {
    let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : undefined;

    if (carrito) {
        carrito.push(producto);
        localStorage.setItem('carrito',JSON.stringify(carrito));
    } else {
        let arreglo = [producto];
        localStorage.setItem('carrito',JSON.stringify(arreglo));
    }
}

if (agregarBtn){
    agregarBtn.addEventListener('click',()=>{
        agregarProducto();
        window.location.reload();
    })
}

productoDetallesImg && crearImgProdDetalles();
cargarInfoProducto();