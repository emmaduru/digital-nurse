const Patient = require("../models/patient");
const Observation = require("../models/observations");
const Note = require("../models/notes");
const Handover = require("../models/handover");
const {patient_schema, observation_schema, note_schema, handover_schema} = require("../utils/schema");
const {calculate_news_score} = require("../utils/helpers");

const add_patient_page = (req, res) => {
    res.render("patient/add_patient");
}

const add_patient = async (req, res) => {
    try {
        await patient_schema.validate({
            body: req.body,
        })
        await Patient.create(req.body);
        return res.status(201).json({ success: true, message: "Patient successfully created." })
    } catch (err) {
        return res.status(500).json({success: false, message: err.message})
    }
}

const edit_patient_page = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        return res.render("patient/edit_patient", {patient});
    } catch (err) {
        return res.status(500).json({success: false, message: "Could not find patient"})
    }
}

const edit_patient = async (req, res) => {
    try {
        await patient_schema.validate({
            body: req.body,
        })
        await Patient.findByIdAndUpdate(req.params.id, req.body);
        return res.status(201).json({success: true, message: "Patient details successfully editted."});
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

const add_patient_observation_page = (req, res) => {
    res.render("patient/add_patient_observation", {patient_id: req.params.id});
}


const add_patient_observation = async (req, res) => {
    try {
        await observation_schema.validate({
            body: req.body,
        });
        const observation = await Observation.create({
            ...req.body, 
            news_score: calculate_news_score(req.body.pulse, req.body.respiration, req.body.temperature, req.body.systolic_blood_pressure, req.body.acvpu, req.body.oxygen_sats_scale, req.body.on_oxygen, req.body.oxygen_saturation),
            nurse: res.locals.user.full_name,
        });
        await Patient.findByIdAndUpdate(req.params.id, {news_score: observation.news_score, $push: { observations: observation }})
        return res.status(201).json({success: true, message: "Patient observations successfully added."})
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

const add_patient_note_page = async (req, res) => {
    res.render("patient/add_patient_note", {patient_id: req.params.id});
}

const add_patient_note = async (req, res) => {
    try {
        await note_schema.validate({
            body: req.body,
        });
        const note = await Note.create({
            ...req.body,
            nurse: res.locals.user.full_name
        });
        await Patient.findByIdAndUpdate(req.params.id, {$push: {notes: note}});
        return res.status(201).json({success: true, message: "Patient notes successfully added."})
    } catch (err) {
        return res.status(500).json({success: false, message: err.message})
    }
}

const add_patient_handover_page = async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    res.render("patient/add_patient_handover", {patient, 
        prev_handover: patient.handovers.length > 0 ? patient.handovers[patient.handovers.length - 1] : {}})    
}

const add_patient_handover = async (req, res) => {
    try {
        await handover_schema.validate({
            body: req.body
        })
        const handover = await Handover.create({
            ...req.body,
            nurse: res.locals.user.full_name
        });
        await Patient.findByIdAndUpdate(req.params.id, {diagnosis: handover.diagnosis, $push: {handovers: handover}});
        return res.status(201).json({success: true, message: "Patient Handover successfully added."})
    } catch (err) {
        return res.status(500).json({success: false, message: err.message})
    }
}

const patient_detail = async(req, res) => {
    const patient = await Patient.findById(req.params.id);
    res.render("patient/patient_details", {patient, handovers: patient.handovers.reverse(), observations: patient.observations.reverse(), notes: patient.notes.reverse()})
}

const all_patients = async(req, res) => {
    const patients = await Patient.find();
    const medical_patients = patients.filter(patient => patient.ward == "Medical Ward")
    const surgical_patients = patients.filter(patient => patient.ward == "Surgical Ward")
    const a_and_e_patients = patients.filter(patient => patient.ward == "Accident and Emergency")
    const theatre_patients = patients.filter(patient => patient.ward == "Theatre")
    res.render("index", {patients, medical_patients, surgical_patients, a_and_e_patients, theatre_patients})
}

module.exports = {
    add_patient_page,
    add_patient,
    edit_patient_page,
    edit_patient,
    add_patient_observation_page,
    add_patient_observation,
    add_patient_note_page,
    add_patient_note,
    add_patient_handover_page,
    add_patient_handover,
    patient_detail,
    all_patients
}