//////////////Complementos/////////////
//Imagen logo
let logoContainer = document.querySelectorAll('.logo-container');
logoContainer.forEach(element => {
    let imgElement = document.createElement('img');
    imgElement.className = 'logo-img';
    imgElement.src = `assets/images/logo-sports.png`;
    imgElement.alt = `Ir a 'Home'`;
    imgElement.title= `Overcomer Your Limits`;
    element.appendChild(imgElement);
});

let logoContainerPages = document.querySelectorAll('.logo-container-pages');
logoContainerPages.forEach(element => {
    let imgElement = document.createElement('img');
    imgElement.className = 'logo-img';
    imgElement.src = `../assets/images/logo-sports.png`;
    imgElement.alt = `Ir a 'Home'`;
    imgElement.title= `Overcomer Your Limits`;
    element.appendChild(imgElement);
});

//////Tarjeta de redes y contacto footer
//containers de contacto y redes
let contacto = document.querySelector('.footer-contacto');
let redes = document.querySelector('.footer-redes');

let contactoPages = document.querySelector('.footer-contacto-pages');
let redesPages = document.querySelector('.footer-redes-pages');

//tarjeta para reutilizar
let tarjeta = (title,imgs) => {
    let fragment = document.createDocumentFragment();

    let h3 = document.createElement('h3');
    h3.textContent = title;
    fragment.appendChild(h3);

    let ul = document.createElement('ul');

    imgs.forEach(element => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        let text = document.createTextNode(` ${element.content}`);

        img.src = element.src;
        img.height = 20;
        img.alt = '';

        li.appendChild(img);
        li.appendChild(text);
        
        ul.appendChild(li);
    })

    fragment.appendChild(ul);

    return fragment;
};

//arreglo de imagenes para tarjeta contacto
let arregloImgsContacto = [
    {src: '/assets/images/mail.png', content: 'hola@oyl.com.ar'},
    {src: '/assets/images/phone.png', content: '+54 341 597 0645'}
];
//arreglo de imagenes para tarjeta redes
let arregloImgsRedes = [
    {src: '/assets/images/instagram.png', content: 'OvercomeYourLimits'},
    {src: '/assets/images/x.png', content: 'OvercomeYourLimits'}
]

let arregloImgsContactoPages = [
    {src: '../assets/images/mail.png', content: 'hola@oyl.com.ar'},
    {src: '../assets/images/phone.png', content: '+54 341 597 0645'}
];
let arregloImgsRedesPages = [
    {src: '../assets/images/instagram.png', content: 'OvercomeYourLimits'},
    {src: '../assets/images/x.png', content: 'OvercomeYourLimits'}
]

contacto.appendChild(tarjeta('Contacto',arregloImgsContacto));
redes.appendChild(tarjeta('Redes',arregloImgsRedes))

contactoPages.appendChild(tarjeta('Contacto',arregloImgsContactoPages));
redesPages.appendChild(tarjeta('Redes',arregloImgsRedesPages))

//Manejar header
let carritoContador = document.querySelector('.carritoIdicador');
let buscarCarrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : undefined;

//manejar contador de carrito en header
if (buscarCarrito && buscarCarrito.length > 0) {
    carritoContador.textContent = `(${buscarCarrito.length})`;
}