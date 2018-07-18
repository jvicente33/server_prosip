var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TAtributosSchema = new Schema({
    id_producto:Number,
    id_madera: Number,
    id_tsmall: Number,
    id_tmedium: Number,
    id_tlarge: Number
});

var TAtributos = mongoose.model('t_atributos', TAtributosSchema);

module.exports = TAtributos;
