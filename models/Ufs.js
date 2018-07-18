var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UfsSchema = new Schema({
    uf:String,
    date:String
});

var Ufs = mongoose.model('ufs', UfsSchema);

module.exports = Ufs;
