const add_patient_handover_form = document.querySelector("#add-patient-handover-form");

add_patient_handover_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = add_patient_handover_form.full_name.value;
    const diagnosis = add_patient_handover_form.diagnosis.value;
    const past_medical_history = add_patient_handover_form.past_medical_history.value;
    const dnacpr = add_patient_handover_form.dnacpr.value === "Yes" ? true: false;
    const cannula = add_patient_handover_form.cannula.value === "Yes" ? true: false;
    const catheter = add_patient_handover_form.catheter.value === "Yes" ? true: false;
    const fluid_balance = add_patient_handover_form.fluid_balance.value === "Yes" ? true: false;
    const food_chart = add_patient_handover_form.food_chart.value === "Yes" ? true: false;
    const diabetic = add_patient_handover_form.diabetic.value === "Yes" ? true: false;
    const incontinent = add_patient_handover_form.incontinent.value === "Yes" ? true: false;
    const mffd = add_patient_handover_form.mffd.value === "Yes" ? true: false;
    const tvn_issues = add_patient_handover_form.tvn_issues.value;
    const mobility_and_handling = add_patient_handover_form.mobility_and_handling.value;
    const diet_and_fluids = add_patient_handover_form.diet_and_fluids.value;
    const jobs = add_patient_handover_form.jobs.value;
    const patient_id = add_patient_handover_form.patient_id.value;

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
        const res = await fetch(`/patients/${patient_id}/add_handover`, {
            method: "POST",
            body: JSON.stringify({
                full_name,
                diagnosis,
                past_medical_history,
                dnacpr,
                cannula,
                catheter,
                fluid_balance,
                food_chart,
                diabetic,
                incontinent,
                mffd,
                tvn_issues,
                mobility_and_handling,
                diet_and_fluids,
                jobs
            }),
            headers: {"Content-Type": "application/json"}
        });

        const data = await res.json();

        if (data.success) {
            location.replace(`/patients/${patient_id}`);
        } else {
            set_form_err_content(data.message);
        }
    } catch (err) {
        console.log(err);
    }

})