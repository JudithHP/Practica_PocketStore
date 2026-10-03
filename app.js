const contenedor = document.getElementById("usuarios");

fetch("https://jsonplaceholder.typicode.com/users")
    .then(respuesta => respuesta.json())
    .then(usuarios => {

        contenedor.innerHTML = "";
        usuarios.forEach(usuario => {
            contenedor.innerHTML += `
                <div class="usuario">
                    <h3>${usuario.name}</h3>
                    <p>
                        <strong>Usuario:</strong>
                        ${usuario.username}
                    <p>
                        <strong>Correo:</strong>
                        ${usuario.email}
                    </p>

                    <p>
                        <strong>Ciudad:</strong>
                        ${usuario.address.city}
                    </p>
                </div>
            `;
        });

    })
    .catch(error => {
        console.log("Error:", error);
        contenedor.innerHTML =
            "<p>No se pudo cargar la información.</p>";

    });


if ("serviceWorker" in navigator) {

    navigator.serviceWorker
        .register("./sw.js")

        .then(() => {
            console.log("Service Worker registrado correctamente");
        })

        .catch(error => {
            console.log("Error al registrar Service Worker:", error);
        });

}