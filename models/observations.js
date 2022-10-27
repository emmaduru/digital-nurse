const mongoose = require("mongoose");
const {DateTime} = require("luxon");

const observationsSchema = new mongoose.Schema({
    pulse: {
        type: Number,
        required: true
    },
    respiration: {
        type: Number,
        required: true
    },
    systolic_blood_pressure: {
        type: Number,
        required: true
    },
    diastolic_blood_pressure: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    oxygen_saturation: {
        type: Number,
        required: true
    },
    on_oxygen: {
        type: Boolean,
        required: true
    },
    acvpu: {
        type: String,
        enum: ["Alert", "Confused", "Voice", "Pain", "Unresponsive"],
        default: "Alert"
    },
    oxygen_sats_scale: {
        type: String,
        enum: ["Scale 1", "Scale 2"],
        default: "Scale 1"
    },
    news_score: {
        type: String,
        required: true
    },
    nurse: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

observationsSchema.set('toObject', { virtuals: true })
observationsSchema.set('toJSON', { virtuals: true })

observationsSchema.virtual("date").get(function() {
    return DateTime.fromJSDate(this.createdAt).setLocale("en-GB").toLocaleString();
})

observationsSchema.virtual("time").get(function() {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.TIME_24_SIMPLE);
})

module.exports = mongoose.model("Observation", observationsSchema);
