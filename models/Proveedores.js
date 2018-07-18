var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProveedoresSchema = new Schema({
    rut: String,
    empresa: String,
    razon_social: String,
    giro: String,
    direccion: String,
    telefono: String,
    nombre_contacto: String,
    email: String,
    fono: String,
    clasificacion: String,
    productos : [{
        codigo : String,
        nombre : String,
        valor : String
    }]

});

var Proveedores = mongoose.model('proveedores', ProveedoresSchema);

module.exports = Proveedores;
