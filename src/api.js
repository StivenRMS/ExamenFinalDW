const express = require('express');
const router = express.Router();
const Patient = require('./models/patientSchema');

require('./database');
const cors = require('cors');
router.use(cors());
// Create 
router.post('/patients', async (req, res) => {
    const patient = new Patient({
      name: req.body.name,
      lastname: req.body.lastname,
      age: req.body.age,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      disease: req.body.disease,
      ultimaVisita: req.body.ultimaVisita,
      medicamentos: req.body.medicamentos,
      observaciones: req.body.observaciones
    });
  
    try {
      const newPatient = await patient.save();
      res.status(201).json(newPatient);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Read - Get all
  router.get('/patients', async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json(patients);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Read - Get one
  router.get('/patients/:id', getPatient, (req, res) => {
    res.json(res.patient);
  });
  
  // Update
  router.patch('/patients/:id', getPatient, async (req, res) => {
    if (req.body.name != null) {
      res.patient.name = req.body.name;
    }
    if (req.body.lastname != null) {
      res.patient.lastname = req.body.lastname;
    }
    //...
  
    try {
      const updatedPatient = await res.patient.save();
      res.json(updatedPatient);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete 
  router.delete('/patients/:id', getPatient, async (req, res) => {
    try {
      await res.patient.deleteOne();
      res.json({ message: 'Deleted Patient' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getPatient(req, res, next) {
    let patient;
    try {
      patient = await Patient.findById(req.params.id);
      if (patient == null) {
        return res.status(404).json({ message: 'Cannot find patient' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.patient = patient;
    next();
  }

module.exports = router;