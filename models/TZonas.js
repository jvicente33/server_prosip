var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TZonasSchema = new Schema({
    id_zona: Number,
    nombre: String,
    id_norma: Number,
    tipo: String,
    id_producto: Number
});

var TZonas = mongoose.model('t_zonas', TZonasSchema);

module.exports = TZonas;
