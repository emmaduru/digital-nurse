const mongoose = require("mongoose");
const {DateTime} = require("luxon");

const noteSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    nurse: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})


noteSchema.set('toObject', { virtuals: true })
noteSchema.set('toJSON', { virtuals: true })

noteSchema.virtual("date").get(function() {
    return DateTime.fromJSDate(this.createdAt).setLocale("en-GB").toLocaleString();
});

noteSchema.virtual("time").get(function () {
    return DateTime.fromJSDate(this.createdAt).setLocale("en-GB").toLocaleString(DateTime.TIME_24_SIMPLE);
})

module.exports = mongoose.model("Note", noteSchema);