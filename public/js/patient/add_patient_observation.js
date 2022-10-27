const add_patient_observation_form = document.querySelector("#add-patient-observation-form");

add_patient_observation_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const pulse = add_patient_observation_form.pulse.value;
    const respiration = add_patient_observation_form.respiration.value;
    const temperature = add_patient_observation_form.temperature.value;
    const systolic_blood_pressure = add_patient_observation_form.systolic_blood_pressure.value;
    const diastolic_blood_pressure = add_patient_observation_form.diastolic_blood_pressure.value;
    const oxygen_saturation = add_patient_observation_form.oxygen_saturation.value;
    const oxygen_sats_scale = add_patient_observation_form.oxygen_sats_scale.value;
    const on_oxygen = add_patient_observation_form.on_oxygen.value;
    const acvpu = add_patient_observation_form.acvpu.value;
    const patient_id = add_patient_observation_form.patient_id.value;

    const form_err = document.querySelector(".form-err");
    const set_form_err_content = (err) => {
        form_err.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${err}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
    }

    try {
        const res = await fetch(`/patients/${patient_id}/add_obs`, {
            method: "POST",
            body: JSON.stringify({
                pulse,
                respiration,
                temperature,
                systolic_blood_pressure,
                diastolic_blood_pressure,
                oxygen_saturation,
                oxygen_sats_scale,
                on_oxygen: on_oxygen === "Yes" ? true : false,
                acvpu
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();

        if (data.success) {
            location.replace(`/patients/${patient_id}`);
        } else {
            set_form_err_content(data.message)
        }
    } catch (err) {
        console.log(err);
    }
})