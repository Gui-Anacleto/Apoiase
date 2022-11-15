const express = require("express")
const app = express();

const dotenv = require("dotenv")
dotenv.config()

const cors = require('cors')

const db = require('./src/DB/connection');

const routes = require("./src/routers/routes");

app.use(cors())
app.use(express.json());
app.use(routes)

app.listen(8000, function(req, res){
    console.log("Servidor rodando porta 8000")
    db.connect().then(()=>{
        console.log("Banco conectado")
    }).catch((err)=>{
        console.log("Erro de conexao"+err)
    })
});
