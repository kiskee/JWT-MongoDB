// src/common/templates/email-templates.ts
export const EmailTemplates = {
  WELCOME: `
<!DOCTYPE html>
<html>
<head>
    <title>Bienvenido a Formación Profesional de Entrenadores de Natación</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
            height: auto;
        }
        h1 {
            color: #0073e6;
            text-align: center;
            margin-top: 20px;
        }
        p {
            line-height: 1.6;
            font-size: 16px;
            color: #555;
        }
        .button {
            display: inline-block;
            margin: 20px auto;
            padding: 12px 24px;
            background-color: #0073e6;
            color: #f4f4f4;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            text-align: center;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
        }
        a{
        color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Encabezado con el logo -->
        <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/swimi-2be7a.firebasestorage.app/o/avatars%2Ffinal.png?alt=media&token=9b469610-77bb-4bfa-b986-3d10b0e7af70" alt="Logo de Formación Profesional de Entrenadores de Natación">
        </div>

        <!-- Mensaje de bienvenida -->
        <h1>¡Bienvenido, {{name}}!</h1>
        <p>Gracias por registrarte en nuestro programa de <strong>Formación Profesional de Entrenadores de Natación</strong>. Estamos emocionados de tenerte a bordo y ayudarte a desarrollar tus habilidades para convertirte en un entrenador profesional.</p>
        <p>Nuestro programa está diseñado para ofrecerte las herramientas y el conocimiento necesario para destacarte en el mundo de la natación. Con más de <strong>500 entrenadores graduados</strong> y una tasa de satisfacción del <strong>95%</strong>, estamos seguros de que encontrarás nuestro contenido invaluable.</p>
        <p>No dudes en explorar nuestros cursos y comenzar tu viaje hacia el éxito. Si tienes alguna pregunta, nuestro equipo de mentores está aquí para ayudarte en cada paso del camino.</p>

        <!-- Botón de llamado a la acción -->
        <div style="text-align: center;">
            <a href="https://www.svgswim.top/courses" class="button">Explora Nuestros Cursos</a>
        </div>

        <!-- Pie de página -->
        <div class="footer">
            <p>Atentamente,<br>El equipo de Formación Profesional de Entrenadores de Natación</p>
        </div>
    </div>
</body>
</html>
`,
  RESET_PASSWORD: `
<!DOCTYPE html>
<html>
<head>
    <title>Restablecer contraseña - Formación Profesional de Entrenadores de Natación</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
            height: auto;
        }
        h1 {
            color: #0073e6;
            text-align: center;
            margin-top: 20px;
        }
        p {
            line-height: 1.6;
            font-size: 16px;
            color: #555;
            text-align: center;
        }
        .button {
            display: inline-block;
            margin: 20px auto;
            padding: 12px 24px;
            background-color: #0073e6;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            text-align: center;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Encabezado con el logo -->
        <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/swimi-2be7a.firebasestorage.app/o/avatars%2Ffinal.png?alt=media&token=9b469610-77bb-4bfa-b986-3d10b0e7af70" alt="Logo de Formación Profesional de Entrenadores de Natación">
        </div>

        <!-- Título y mensaje -->
        <h1>Restablecer contraseña</h1>
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el siguiente botón para continuar con el proceso:</p>

        <!-- Botón de restablecimiento -->
        <div style="text-align: center;">
            <a href="{{resetLink}}" class="button">Restablecer contraseña</a>
        </div>

        <!-- Mensaje adicional -->
        <p>Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña no se modificará.</p>

        <!-- Pie de página -->
        <div class="footer">
            <p>Atentamente,<br>El equipo de Formación Profesional de Entrenadores de Natación</p>
        </div>
    </div>
</body>
</html>
`,
};
