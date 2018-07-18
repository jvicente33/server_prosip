var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TPreciosSchema = new Schema({
    id_producto:Number,
    codigo: String,
    nombre: String,
    promedio: Number,
    SudPanel: Number,
    Termocret: Number,
    Easywood: Number,
    Propanel: Number,
    Ingepanel: Number,
    Eden: Number
});

var TPrecios = mongoose.model('t_precios', TPreciosSchema);

module.exports = TPrecios;
