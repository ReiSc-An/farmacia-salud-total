const medicamentos = [
    {nombre:"Paracetamol",precio:8,imagen:"assets/images/paracetamol.jpg"},
    {nombre:"Ibuprofeno",precio:12,imagen:"assets/images/ibuprofeno.jpg"},
    {nombre:"Amoxicilina",precio:25,imagen:"assets/images/amoxicilina.jpg"}
];

const contenedor = document.getElementById("contenedorProductos");
const listaCarrito = document.getElementById("listaCarrito");
const total = document.getElementById("total");

let carrito = [];

// Mostrar productos
function mostrarProductos(){

    contenedor.innerHTML="";

    medicamentos.forEach((medicamento)=>{

        contenedor.innerHTML += `
        <div class="producto">
            <img src="${medicamento.imagen}" alt="${medicamento.nombre}">
            <h3>${medicamento.nombre}</h3>
            <p>Precio: Bs. ${medicamento.precio}</p>
            <button onclick="agregarCarrito('${medicamento.nombre}')">
                Agregar al carrito
            </button>
        </div>
        `;

    });

}

// Agregar al carrito
function agregarCarrito(nombre){

    const producto = medicamentos.find(m => m.nombre === nombre);

    const existe = carrito.find(item => item.nombre === nombre);

    if(existe){

        existe.cantidad++;

    }else{

        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });

    }

    mostrarCarrito();

}

// Mostrar carrito
function mostrarCarrito(){

    listaCarrito.innerHTML = "";

    let suma = 0;

    if(carrito.length === 0){

        listaCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
        total.textContent = "Total: Bs. 0";
        return;

    }

    carrito.forEach((producto, indice)=>{

        const subtotal = producto.precio * producto.cantidad;
        suma += subtotal;

        listaCarrito.innerHTML += `
            <div class="item-carrito">

                <div>
                    <strong>${producto.nombre}</strong><br>
                    Bs. ${producto.precio} x ${producto.cantidad} = Bs. ${subtotal}
                </div>

                <div>

                    <button onclick="disminuirCantidad(${indice})">−</button>

                    <button onclick="aumentarCantidad(${indice})">+</button>

                    <button onclick="eliminarProducto(${indice})">🗑</button>

                </div>

            </div>
        `;

    });

    total.textContent = "Total: Bs. " + suma;

}
function aumentarCantidad(indice){

    carrito[indice].cantidad++;

    mostrarCarrito();

}

function disminuirCantidad(indice){

    carrito[indice].cantidad--;

    if(carrito[indice].cantidad <= 0){

        carrito.splice(indice,1);

    }

    mostrarCarrito();

}
function eliminarProducto(indice){

    carrito.splice(indice, 1);

    mostrarCarrito();

}
// Buscador
const buscador = document.getElementById("buscar");

buscador.addEventListener("keyup", () => {

    const texto = buscador.value.toLowerCase();

    const filtrados = medicamentos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );

    contenedor.innerHTML = "";

    filtrados.forEach((medicamento)=>{

        contenedor.innerHTML += `
        <div class="producto">
            <img src="${medicamento.imagen}" alt="${medicamento.nombre}">
            <h3>${medicamento.nombre}</h3>
            <p>Precio: Bs. ${medicamento.precio}</p>
            <button onclick="agregarCarrito('${medicamento.nombre}')">
                Agregar al carrito
            </button>
        </div>
        `;

    });

});

mostrarProductos();
// Validación del formulario

const formulario = document.getElementById("formContacto");

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if(nombre === "" || correo === "" || mensaje === ""){

        alert("Debe completar todos los campos.");

        return;

    }

    alert("Mensaje enviado correctamente. ¡Gracias por contactarnos!");

    formulario.reset();

});