<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/design.css" media="all" />
    <link rel="icon" type="image/x-icon" href="img/icon.ico" />
    <title>Cinemas Tláhuac | Inicio</title>

    <!--JAVASCRIPT-->
    <script src="https://kit.fontawesome.com/a0043d9bc2.js" crossorigin="anonymous"></script>

    <script type="module" src="js/init.js"></script>

    <!--COMPONENTES-->
    <script type="module" src="/cmp/navbar.js"></script>
    <script type="module" src="/cmp/session.js"></script>
    <script type="module" src="/cmp/footer.js"></script>

    <!--DEPENDENCIAS-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
</head>

<body class="main-bg">

 <h1>Login con Firebase</h1>

    <button onclick="loginWithGoogle()">Iniciar sesión con Google</button>

    <form id="emailLoginForm">
        <input type="email" id="email" placeholder="Correo electrónico" required>
        <input type="password" id="password" placeholder="Contraseña" required>
        <button type="submit">Iniciar sesión con correo y contraseña</button>
    </form>

    <script>
        // Inicializa la configuración de Firebase
        const firebaseConfig = {
            // Configuración de Firebase
        };

        firebase.initializeApp(firebaseConfig);

        // Obtén una referencia al objeto de autenticación de Firebase
        const auth = firebase.auth();

        // Función para iniciar sesión con Google
        function loginWithGoogle() {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider)
                .then((result) => {
                    // El usuario ha iniciado sesión exitosamente
                    const user = result.user;
                    console.log("Usuario autenticado:", user);
                })
                .catch((error) => {
                    // Ocurrió un error durante el inicio de sesión
                    console.error("Error al autenticar con Google:", error);
                });
        }

        // Manejador de evento para el formulario de inicio de sesión con correo y contraseña
        const emailLoginForm = document.getElementById('emailLoginForm');
        emailLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            loginWithEmail(email, password);
        });

        // Función para iniciar sesión con correo y contraseña
        function loginWithEmail(email, password) {
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // El usuario ha iniciado sesión exitosamente
                    const user = userCredential.user;
                    console.log("Usuario autenticado:", user);
                })
                .catch((error) => {
                    // Ocurrió un error durante el inicio de sesión
                    console.error("Error al autenticar con correo y contraseña:", error);
                });
        }
    </script>

</body>

</html>
