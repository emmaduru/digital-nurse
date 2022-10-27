const yup = require("yup");

const patient_schema = yup.object({
    body: yup.object({
        first_name: yup.string().required("First Name is required."),
        last_name: yup.string().required("Last Name is required."),
        email: yup.string().email("Email Address must be valid.").required("Email Address is required."),
        date_of_birth: yup.date().required("Date of Birth is required."),
        phone: yup.string().required("Phone Number is required."),
        address: yup.string().required("Address is required."),
        past_medical_history: yup.string().required("Patient's Past Medical History is required."),
        diagnosis: yup.string().required("Patient's Diagnosis is required."),
        ward: yup.string().required("Ward is required.")
    })
});

const user_schema = yup.object({
    body: yup.object({
        first_name: yup.string().required("First Name is required."),
        last_name: yup.string().required("Last Name is required."),
        email: yup.string().email("Email Address must be valid.").required("Email Address is required."),
        password: yup.string().required("Password is required.")
    })
})

const observation_schema = yup.object({
    body: yup.object({
        pulse: yup.number().required("Patient's Pulse is required."),
        respiration: yup.number().required("Patient's Respiration is required."),
        temperature: yup.number().required("Patient's Temperature is required."),
        systolic_blood_pressure: yup.number().required("Patient's Systolic Blood Pressure is required."),
        diastolic_blood_pressure: yup.number().required("Patient's Diastolic Blood Pressure is required."),
        oxygen_saturation: yup.number().required("Patient's Oxygen Saturation is required."),
        on_oxygen: yup.boolean().required("Patient's oxygen status is required."),
        oxygen_sats_scale: yup.string().required("Oxygen Saturation Scale is required.")
    })
});

const note_schema = yup.object({
    body: yup.object({
        body: yup.string().required("Note body is required.")
    })
});

const handover_schema = yup.object({
    body: yup.object({
        full_name: yup.string().required(),
        dnacpr: yup.boolean().required("Patient's resuscitation status is required."),
        diagnosis: yup.string().required("Patient's diagnosis is required."),
        past_medical_history: yup.string().required("Patient's past medical history is required."),
        tvn_issues: yup.string().required("Patient's Skin issues are required."),
        catheter: yup.boolean().required("Patient's catheter status is required."),
        cannula: yup.boolean().required("Patient's Cannula status is required."),
        fluid_balance: yup.boolean().required("Patient's fluid balance status is required."),
        food_chart: yup.boolean().required("Patient's food chart status is required."),
        incontinent: yup.boolean().required("Patient's continence status is required."),
        mobility_and_handling: yup.string().required("Patient's mobility and handling is required."),
        mffd: yup.boolean().required("Patient's fitness for discharge is required."),
        diabetic: yup.boolean().required("Patient's diabetic status is required."),
        diet_and_fluids: yup.string().required("Patient's nutritional status is required."),
    })
})

module.exports = {user_schema, patient_schema, observation_schema, note_schema, handover_schema};