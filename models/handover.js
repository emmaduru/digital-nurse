const mongoose = require("mongoose");
const {DateTime} = require("luxon");

const handoverSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    dnacpr: {
        type: Boolean,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    past_medical_history: {
        type:String,
        required: true
    },
    tvn_issues: {
        type: String,
        required: true
    },
    catheter: {
        type: Boolean,
        required: true
    },
    cannula: {
        type: Boolean,
        required: true
    },
    fluid_balance: {
        type: Boolean,
        required: true,
    },
    food_chart: {
        type: Boolean,
        required: true
    },
    incontinent: {
        type: Boolean,
        required: true
    },
    mobility_and_handling: {
        type: String,
        required: true
    },
    mffd: {
        type: Boolean,
        required: true
    },
    diabetic: {
        type: Boolean,
        required: true
    },
    diet_and_fluids: {
        type: String,
        required: true
    },
    jobs: {
        type: String,
    },
    nurse: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


handoverSchema.set('toObject', { virtuals: true })
handoverSchema.set('toJSON', { virtuals: true })

handoverSchema.virtual("date").get(function() {
    return DateTime.fromJSDate(this.createdAt).setLocale("en-GB").toLocaleString();
});

handoverSchema.virtual("time").get(function () {
    return DateTime.fromJSDate(this.createdAt).setLocale("en-GB").toLocaleString(DateTime.TIME_24_SIMPLE);
})

module.exports = mongoose.model("Handover", handoverSchema);