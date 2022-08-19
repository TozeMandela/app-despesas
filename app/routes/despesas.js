var express = require('express');
const { mongo } = require('mongoose');
var router = express.Router();
const mongoose = require('mongoose');
require('../data/db_despesa.js');
const db = mongoose.model('despesas');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.find().then(d=>{
    res.json(d)
  })
});

router.get('/:id', (req, res) => {
  db.findOne({_id: req.params.id}).then(d=>{
    res.json(d)
  })
});

router.post('/', (req, res)=>{
  console.log(req.body)
  new db({
    _id : req.body._id,
    _ano : req.body._ano,
    _mes : req.body._mes,
    _dia : req.body._dia, 
    _tipo : req.body._tipo,
    _descricao : req.body._descricao,
    _valor : req.body._valor
  }).save().then(()=>{
    console.log('dispesa salva com sucesso...!');
  }).catch(er =>{
    res.send(er);
  })
});

router.put('/', (req, res) => {
  db.findByIdAndUpdate({_id: req.body._id}, {$set:{
    _ano : req.body._ano,
    _mes : req.body._mes,
    _dia : req.body._dia, 
    _tipo : req.body._tipo,
    _descricao : req.body._descricao,
    _valor : req.body._valor
  }}).then(d=>{
    res.json()
  }).catch(e=>{
    console.log('not act')
  });
});

router.delete('/:id', (req, res) => {
  db.remove({_id:req.params.id}).then(()=>{
    console.log('removido com sucesso')
  }).catch(er=>{
    console.log('erro ao remover')
  })
  console.log(req.params.id);
});

module.exports = router;
