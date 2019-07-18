var mongoose = require('mongoose');
var Category = mongoose.model('category',{
    name : {
        type : String
    }
});


module.exports = {Category};