var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProyectosSchema = new Schema({
    id_usuario:String,
    nombre_usuario:String,
    nombre_proyecto: String,
    descripcion: String,
    object_form: Object,
    object_result: Object,
    object_despacho:Object,
    object_instalacion:Object,
    object_cotizacion:Object,
    created_at: String,
    updated_at: String
});

var Proyectos = mongoose.model('proyectos', ProyectosSchema);

module.exports = Proyectos;
