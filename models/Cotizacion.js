var mongoose = require('mongoose')
var Schema = mongoose.Schema;
let autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var CotizacionSchema = new Schema({
    idproyecto: String,
    cliente: {
        type: String,
        default: ''
    },
    email: String,
    empresa: {
        type: String,
        default: 'n/a'
    },
    uf: Number,
    fecha: String,
    //cotizacion: String,
    nombre_proyecto: String,
    version: String,
    ubicacion: String,
    zona: Number,
    m2: String,
    items: [
        {
            nombre: String,
            cant: Number,
            unit: Number,
            subtotal: Number
        }
    ],
    total_sip: String,
    ufm2sip: String,
    total_comp: String,
    ufm2comp: String,
    total_neto: String,
    ufm2neto: String,
    iva: String,
    totalciva: String,
    ufm2civa: String
});

CotizacionSchema.plugin(autoIncrement.plugin, {
    model: 'Numero',
    field: 'cotizacion',
    startAt: 222,
    incrementBy: 1
});

var CotizacionSchema = mongoose.model('cotizacion', CotizacionSchema);

module.exports = CotizacionSchema;
