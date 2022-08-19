const mongo = require('mongoose');

mongo.Promise = global.Promise;
mongo.connect('mongodb://localhost/db_despesas');

const Despesas = mongo.Schema({
        _id :{
            type: Number,
            require: true
        },
        _ano :{
            type: Number,
            require: true,
            default: Date.now()
        },
        _mes :{
            type: String,
            require: true
        },
        _dia :{
            type: Number,
            require: true
        }, 
        _tipo :{
            type: String,
            require: true
        },
        _descricao :{
            type: String,
            require: true
        },
        _valor :{
            type: String,
            require: true
        }
});

mongo.model('despesas', Despesas);