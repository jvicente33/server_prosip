var mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
var Schema = mongoose.Schema;

var UsuariosSchema = new Schema({
    nombres:String,
    email: String,
    cargo: String,
    password: String,
    telefono: String
});

UsuariosSchema.plugin(timestamp);

var Usuarios = mongoose.model('usuarios', UsuariosSchema);

module.exports = Usuarios;
