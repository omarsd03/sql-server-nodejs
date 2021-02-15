const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbCategoria = require('./db-categoria');
const categoria = require('./categoria');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router); // Ruta principal

// Ruta para todas las categorias
router.route('/categoria').get( (req, res) => {

    dbCategoria.getCategoria().then(result => {
        res.json(result[0]);
    })

})

// Ruta para una categoria por id
router.route('/categoria/:id').get( (req, res) => {

    dbCategoria.getCategoriaPorId( req.params.id ).then(result => {
        res.json(result[0]);
    })

})

// Ruta para guardar una categoria por medio de la clase categoria
router.route('/categoria/guardar').post( (req, res) => {

    let categoria = {...req.body};

    dbCategoria.insertCategoria( categoria ).then(result => {
        res.json(result[0]);
    });

})

// Ruta para actualizar una categoria por medio de la clase categoria
router.route('/categoria/actualizar').post( (req, res) => {

    let categoria = {...req.body};

    dbCategoria.updateCategoria( categoria ).then(result => {
        res.json(result[0]);
    });

})

const port = process.env.PORT || 8090;
app.listen(port);
console.log('Categoria API Iniciado en el puerto: ' + port); // Mensaje de inicio del servicio