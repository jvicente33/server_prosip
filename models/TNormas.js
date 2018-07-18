var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TNormasSchema = new Schema({
    id_norma: Number,
    nombre: String
});

var TNormas = mongoose.model('t_normas', TNormasSchema);

module.exports = TNormas;
