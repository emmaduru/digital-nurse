const mongoose = require("mongoose");
const {isEmail} = require("validator");
const {DateTime} = require("luxon");

const patientSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, "Email Address is not valid."],
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    past_medical_history: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        enum: ["Medical Ward", "Surgical Ward", "Accident and Emergency", "Theatre"],
        default: "Medical Ward"
    },
    diagnosis: {
        type: String,
        required: true
    },
    news_score: {
        type: Number
    },
    notes: [],
    observations: [],
    handovers: []
}, {
    timestamps: true
})

patientSchema.set('toObject', { virtuals: true })
patientSchema.set('toJSON', { virtuals: true })

patientSchema.virtual("birth_day").get(function() {
    return DateTime.fromJSDate(this.date_of_birth).setLocale("en-GB").toLocaleString();
})

patientSchema.virtual("full_name").get(function() {
    return `${this.first_name} ${this.last_name}`
})

module.exports = mongoose.model("Patient", patientSchema);