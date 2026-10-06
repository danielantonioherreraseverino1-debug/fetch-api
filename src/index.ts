// Interfaz que representa el objeto
// que queremos obtener después de transformar los datos.
interface User {
    name: string;
    email: string;
    username: string;
    city: string;
}

// Interfaz que representa la estructura
// original que recibimos desde la API.
interface ApiUser {
    id: number;
    name: string;
    username: string;
    email: string;

    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;

        geo: {
            lat: string;
            lng: string;
        };
    };

    phone: string;
    website: string;

    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

// Función principal para obtener los usuarios
async function obtenerUsuarios(): Promise<void> {

    try {

        // Realizamos la petición HTTP GET
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        // Convertimos la respuesta a JSON
        const usuarios: ApiUser[] = await response.json();

        // Mostramos el primer usuario para comprobar
        // la estructura que devuelve la API.
        console.log("Primer usuario recibido:");
        console.log(usuarios[0]);

        // Transformamos el arreglo original
        // utilizando map().
        const usuariosTransformados: User[] = usuarios.map(
            (usuario): User => {

                return {
                    name: usuario.name,
                    email: usuario.email,
                    username: usuario.username,
                    city: usuario.address.city
                };

            }
        );

        // Mostramos el nuevo arreglo
        console.log("Usuarios transformados:");
        console.log(usuariosTransformados);

    } catch (error) {

        // Si ocurre algún problema,
        // mostramos el error en consola.
        console.error("Ocurrió un error:", error);

    }
}

// Ejecutamos la función
obtenerUsuarios();
