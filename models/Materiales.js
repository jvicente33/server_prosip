var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var MaterialesSchema = new Schema({
    id_producto: Number,
    codigo: String,
    elemento: String,
    clase: String,
    nombre: String,
    descripcion: String,
    altura: String,
    volumen: String,
    promedio: Number
});

var Materiales = mongoose.model('materiales', MaterialesSchema);

module.exports = Materiales;
