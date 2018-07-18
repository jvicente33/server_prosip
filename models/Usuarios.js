var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UsuariosSchema = new Schema({
    nombres:String,
    email: String,
    cargo: String,
    password: String
});

var Usuarios = mongoose.model('usuarios', UsuariosSchema);

module.exports = Usuarios;
