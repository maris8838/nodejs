var mongoose = require('mongoose');
var State = mongoose.model('state',{
    name : {
        type : String,
        require : true
    },
    countryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'country'
    }
});


module.exports = {State};