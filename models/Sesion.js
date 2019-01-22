var mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
var Schema = mongoose.Schema;

var SesionSchema = new Schema({
     email: String,
     cargo: String,
     authDash: {
          type: String,
          default: 'N'
     },
     authCubicador: {
          type: String,
          default: 'N'
     },
     saveProject: {
          type: String,
          default: 'N'
     },
     dateStart: Date,
     dateEnd: {
          type: Date,
          default: new Date('1995-08-02')
     }
});

SesionSchema.plugin(timestamp);

var Sesion = mongoose.model('sesion', SesionSchema);

module.exports = Sesion;
