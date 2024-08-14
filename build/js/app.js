
document.addEventListener('DOMContentLoaded', function(){
    inciarApp();
})

function inciarApp() {
   navegacionFija();
   crearGaleria(); 
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobrelaweb = document.querySelector('.sobre-laweb');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if( sobrelaweb.getBoundingClientRect().bottom < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i<=12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML =`
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/wepb">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen Galeria">
        `;
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML =`
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/wepb">
    <img loading="lazy" width="200" height="300" src="build/img/thumb/grande/${id}.jpg" alt="Imagen Galeria">
    `;

        // Crea el Overlay con la imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');
        overlay.onclick = function() {
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }

        // Boton para cerrar el Modal
        const cerrarModal = document.createElement('P');
        cerrarModal.textContent = 'X';
        cerrarModal.classList.add('btn-cerrar');
        cerrarModal.onclick = function() {
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        };
        overlay.appendChild(cerrarModal)

        // Añadirlo al HTML
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fijar-body');
}

// document.addEventListener("DOMContentLoaded", function() {
//     // Ruta al archivo CSV
//     const csvFilePath = "reddit_data.csv";

//     // Selecciona la tabla y las filas de encabezado y datos
//     const csvTable = document.getElementById("csvTable");
//     const tableHead = csvTable.querySelector("thead");
//     const tableBody = csvTable.querySelector("tbody");

//     // Cargar el archivo CSV
//     fetch(csvFilePath)
//         .then(response => response.text())
//         .then(data => {
//             // Divide el archivo CSV en filas
//             const rows = data.split("\n");

//             // Itera a través de las filas y construye la tabla
//             rows.forEach((row, index) => {
//                 const columns = row.split(",");
//                 const newRow = document.createElement(index === 0 ? "th" : "tr"); // Usa "th" para la fila de encabezado
//                 columns.forEach((columnText) => {
//                     const cell = index === 0 ? "th" : "td";
//                     const newCell = document.createElement(cell);
//                     newCell.textContent = columnText;
//                     newRow.appendChild(newCell);
//                 });

//                 if (index === 0) {
//                     tableHead.appendChild(newRow);
//                 } else {
//                     tableBody.appendChild(newRow);
//                 }
//             });
//         })
//         .catch(error => {
//             console.error("Error al cargar el archivo CSV:", error);
//         });
// });
