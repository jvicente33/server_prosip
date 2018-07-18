var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var KilometrosSchema = new Schema({
    origen:String,
    destino: String,
    km: String
});

var Kilometros = mongoose.model('kilometros', KilometrosSchema);

module.exports = Kilometros;
