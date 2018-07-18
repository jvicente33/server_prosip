var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ClientesSchema = new Schema({
    nombre_contacto: String,
    email: String,
    fono: String,
    empresa: String,
    razon_social: String,
    rut: String,
    giro: String,
    direccion: String,
    telefono: String,
    password: String
});

var Clientes = mongoose.model('clientes', ClientesSchema);

module.exports = Clientes;
