const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    age: Number,
    address: String,
    phone: String,
    email: String,
    disease: String,
    ultimaVisita: String,
    medicamentos: String,
    observaciones: String
  
});

module.exports = mongoose.model('Patient', patientSchema);