var mongoose = require('mongoose');
var Country = mongoose.model('country',{
    name : {
        type : String
    }
});


module.exports = {Country};