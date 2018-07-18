var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var MaterialesSchema = new Schema({
    codigo: String,
    elemento: String,
    clase: String,
    nombre: String,
    descripcion: String,
    altura: String,
    volumen: String,
    precio_prosip: String
});

var Materiales = mongoose.model('materiales', MaterialesSchema);

module.exports = Materiales;
