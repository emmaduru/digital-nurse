const bcrypt = require("bcrypt")

const hash_password = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    return hashed_password;
}

const calculate_news_score = (pulse, respiration, temperature, systolic_blood_pressure, acvpu, oxygen_sats_scale, on_oxygen, oxygen_saturation) => {
    let score = 0;
    // Respiration
    if (respiration <= 8 || respiration >= 25) score += 3;
    else if (respiration >= 21 && respiration <= 24) score += 2;
    else if (respiration >= 9 && respiration <= 11) score += 1;
    else score += 0;

    // Oxygen Saturation
    if (oxygen_sats_scale === "Scale 1") {
        if (oxygen_saturation <= 91) score += 3;
        else if (oxygen_saturation >= 92 && oxygen_saturation <= 93) score += 2;
        else if (oxygen_saturation >= 94 && oxygen_saturation <= 95) score += 1;
        else score += 0;
    } else {
        if (oxygen_saturation <= 83) score += 3;
        else if (oxygen_saturation >= 84 && oxygen_saturation <= 85) score += 2;
        else if (oxygen_saturation >= 86 && oxygen_saturation <= 87) score += 1;
        else {
            score += 0;
        }
    }

    // On Oxygen
    if (on_oxygen) score += 2;
    else score += 0;

    // Systolic Blood Pressure
    if (systolic_blood_pressure <= 90 || systolic_blood_pressure >= 220) score += 3;
    else if (systolic_blood_pressure >= 91 && systolic_blood_pressure <= 100) score += 2;
    else if (systolic_blood_pressure >= 101 && systolic_blood_pressure <= 110) score += 1;
    else score += 0;

    // Pulse
    if (pulse <= 40 || pulse >= 131) score += 3;
    else if (pulse >= 111 && pulse <= 130) score += 2;
    else if (pulse >= 41 && pulse <= 50 || pulse >= 91 && pulse <= 110) score += 1;
    else score += 0;

    // ACVPU
    if (acvpu === "Alert") score += 0;
    else score += 3;

    // Temperature
    if (temperature <= 35.0) score += 3;
    else if (temperature >= 39.1) score += 2;
    else if (temperature >= 35.1 && temperature <= 36.0 || temperature >= 38.1 && temperature <= 39.0) score += 1;
    else score += 0;

    return score;
}


module.exports = {hash_password, calculate_news_score}