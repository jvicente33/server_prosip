var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CotizacionSchema = new Schema({
    cliente: String,
    email: String,
    empresa: String,
    uf: String,
    fecha: Date,
    cotizacion: String,
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

var CotizacionSchema = mongoose.model('cotizacion', CotizacionSchema);

module.exports = CotizacionSchema;
