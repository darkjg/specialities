const express = require("express");
const app = express();
const { usersData, especialidades, usersEspecialidad } = require("./Usuarios.js");

console.log(usersData)

app.listen(3000, () => {
    console.log("serivor en el 3000")
});

let nav = (`
            <a href="/">home</a>                 
            `);

especialidades.forEach(especialidad => {
    nav += ` <a href="/${especialidad}">${especialidad}</a>`
});

app.get("/", (req, res) => {
    res.send(`<h1>Pagina Principal</h1><p>existen ${especialidades.length} especialidades diferentes y ${usersData.length} usuarios en total </p><nav>${nav}</nav>`)
});
especialidades.forEach(especialidad => {
    app.get(`/${especialidad}`, (req, res) => {
        let envio = "";
        envio += (`<h1>Paguina de ${especialidad}</h1><nav>${nav}</nav>`);
        let usuarios = usersEspecialidad(especialidad);
        envio += (`<p>Este departamento tiene ${usuarios.length} personas y son los siguientes:</p>`);
        envio += (`<ul>`)
        usuarios.forEach(usuario => {
            envio += (`<li> Nombre:${usuario.name} cuya edad es:${usuario.age}</li>`);
           
        });

        envio += (`</ul>`)
        envio += (`<p></p>`)
        res.send(envio);
    });
});


app.use((req, res) => {
    res.status(404).send(`<h1>pagina no encotnrada</h1><a href="/">home</a>`)
})
