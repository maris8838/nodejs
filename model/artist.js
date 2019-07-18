var mongoose = require('mongoose');
var Artist = mongoose.model('artist',{
    name : {
        type : String
    },
    films : {
        type : Array
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    }
});


module.exports = {Artist};