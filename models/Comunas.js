var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ComunasSchema = new Schema({
    nombre:String,
});

var Comunas = mongoose.model('comunas', ComunasSchema);

module.exports = Comunas;
