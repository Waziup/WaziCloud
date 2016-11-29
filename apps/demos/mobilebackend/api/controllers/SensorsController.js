"use strict";
const axios = require('axios');
const config = {
  headers:{'Fiware-ServicePath': '/TEST','Fiware-Service': 'waziup'}
}
/**
 * SensorsController
 * @description :: Server-side logic for ...
 */

module.exports = {
  index(req, res) {
    if (req.method==='POST') {
      axios.post('http://broker.waziup.io/v2/entities',{
            "id": req.body.id,
            "type": req.body.type,
            "temperature": {
              "value": req.body.temperature.value,
              "type": req.body.temperature.type
            },
            "pressure": {
              "value": req.body.pressure.value,
              "type": req.body.pressure.type
            }
          },config)
          .then(function(response) {
            console.log(response.data);
            res.ok(response.data);
          }).catch(function(error){
            console.log(error.response.data);
            res.serverError(error.response.data);
          });
      }else if(req.method==='GET'){
        axios.get('http://broker.waziup.io/v2/entities/'+req.param.id+'/attrs/'+req.param.stype+'/value',config)
          .then(function(response) {
            res.ok(response.data);
          }).catch(function(error){
            res.serverError(error.response.data);
          });
      }else if(req.method==='PUT'){
        axios.put('http://broker.waziup.io/v2/entities/'+req.body.id+'attrs/'+req.body.stype+'/'+req.body.type,{
          value:req.body.value,
        },config)
          .then(function(response) {
            res.ok(response);
          }).catch(function(error){
            res.serverError(error.response.data);
          });
      }
    },

    info(req,res){
      axios.get('http://broker.waziup.io/version',config)
              .then(function(response) {
                console.log(response);
                res.ok(response.data);
              })
              .catch(function(error){
                res.serverError(error.response.data);
              });

    },
    getAll(req,res){
      axios.get('http://broker.waziup.io/v2/entities',config)
                .then(function(response) {
                  console.log(response);
                  res.ok(response.data);
                })
                .catch(function(error){
                  res.serverError(error.response.data);
                });
    }
  };
