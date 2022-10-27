const add_patient_form = document.querySelector("#add-patient-form");

add_patient_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const first_name = add_patient_form.first_name.value;
    const last_name = add_patient_form.last_name.value;
    const email = add_patient_form.email.value;
    const date_of_birth = add_patient_form.date_of_birth.value;
    const phone = add_patient_form.phone.value;
    const ward = add_patient_form.ward.value;
    const past_medical_history = add_patient_form.past_medical_history.value;
    const diagnosis = add_patient_form.diagnosis.value;
    const address = add_patient_form.address.value;

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
        const res = await fetch("/patients/add", {
            method: "POST",
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                date_of_birth,
                phone,
                ward,
                past_medical_history,
                diagnosis,
                address
            }),
            headers: {"Content-Type": "application/json"}
        });
        const data = await res.json();

        if (data.success) {
            location.replace("/")
        } else {
            set_form_err_content(data.message);
        }
    } catch (err) {
        console.log(err);
    }
})