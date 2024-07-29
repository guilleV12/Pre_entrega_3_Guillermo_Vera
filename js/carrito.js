//////////////////////////////////////////JS MANEJO DE CARRITO
//variables con elementos html de la pagina del carrito e icono de carrito en el navegador 
let carritoHeader = document.querySelector('#carrito-header');
let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : undefined;
let tableBody = document.querySelector('tbody');
let listaCarrito = document.querySelector('.lista-carrito');

//Funcion para crear td's de una row correspondiente a un producto en el carrito
function crearTdProds(src,precio,nombre,id,posicion) {
    let tr = document.createElement('tr');
    let tdProducto = document.createElement('td');
    tdProducto.innerHTML = `<img src='../${src}'></img>`;
    tr.appendChild(tdProducto);  
    let tdNombre = document.createElement('td');
    tdNombre.textContent = nombre;
    let tdPrecio = document.createElement('td');
    tdPrecio.textContent = `$${precio}`;
    let tdComprar = document.createElement('td');
    tdComprar.innerHTML = `<button class='comprar-elemento' idprod='${id}' carritoPos='${posicion}'>Comprar</button><button class='eliminar-carrito' idprod='${id}' carritoPos='${posicion}'>Eliminar</button>`;
    tr.appendChild(tdProducto);
    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdComprar);
    return tr;
}

//Funcion para renderizar la informacion de la tabla de carrito
function renderListaCarrito() {
    let posicion = 0;
    carrito.forEach(producto => {
        let fragmento = document.createDocumentFragment();
        let {nombre,precio,src,id} = producto;
        fragmento.appendChild(crearTdProds(src,precio,nombre,id,posicion));
        tableBody.appendChild(fragmento);
        posicion ++;
    });
}

//funcion para solicitar info del carrito
function crearTr(id,textContent,vacio) {
    let fragmento = document.createDocumentFragment();
    let tr = document.createElement('tr');
    let td = document.createElement('td');

    if (vacio) {
        td.colSpan = 4;
        td.id = id;
        td.textContent = textContent;
        tr.appendChild(td);
        fragmento.appendChild(tr);
        tableBody.appendChild(fragmento);
    } else {
        renderListaCarrito();
    }
    
}

//funcion para manejar si esta vacio o renderiza info el carrito
function hayProdsCarrito() {
    if (carrito && carrito.length > 0) {
        crearTr('','',false);
        listaCarrito.innerHTML +=`<button class="comprar-todo">Comprar todo</button>
                                  <button class="vaciar-carrito">Vaciar carrito</button>`;
    }else{
            crearTr('carrito-vacio-txt','El carrito esta vacio.',true);
    }
}


hayProdsCarrito();

///////////////////Comprar producto
//variables correspondientes a compro el eliminacion de productos del carrito
let btnComprar = document.querySelectorAll('.comprar-elemento');
let btnEliminar = document.querySelectorAll('.eliminar-carrito');
let btnComprarTodo = document.querySelector('.comprar-todo');
let btnEliminarTodo = document.querySelector('.vaciar-carrito');

//borrar un producto del carrito
function borrarProd(posicion) {
    carrito.splice(posicion,1);
    localStorage.setItem('carrito',JSON.stringify(carrito));
    window.location.reload();
}

//borrar todos los productos del carrito
function borrarTodoProd(){
    localStorage.removeItem('carrito')
    window.location.reload();
}

//comprar un producto
function comprarProducto(idProd,posicion) {
    let producto = carrito.find(prod=>  prod.id == idProd );
    let respuesta = confirm(`Desea comprar ${producto.nombre} por $${producto.precio}?`);
    if (respuesta) {
        borrarProd(posicion);
    }
}

//comprar todos los productos
function comprarTodo(){
    let precioTotal = carrito.reduce((acc,prod) => acc + prod.precio, 0,);
    let respuesta = confirm(`Desea comprar todos los productos por $${precioTotal}?`);
    if (respuesta) {
        borrarTodoProd();
    }
}

//seccion de acciones de botones (comprar/eliminar uno/todos los productos);
btnComprar.forEach(btn => {
    btn.addEventListener('click',() => {
        comprarProducto(btn.getAttribute('idprod'),btn.getAttribute('carritoPos'));
    })
});

btnEliminar.forEach(btn => {
    btn.addEventListener('click',() => {
        borrarProd(btn.getAttribute('carritoPos'));
    })
});

if (btnComprarTodo){
    btnComprarTodo.addEventListener('click',()=>{
        comprarTodo()
    });
}

if (btnEliminarTodo){
    btnEliminarTodo.addEventListener('click',()=>{
        borrarTodoProd();
    })
}