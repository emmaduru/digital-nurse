const edit_patient_form = document.querySelector("#edit-patient-form");

edit_patient_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const first_name = edit_patient_form.first_name.value;
    const last_name = edit_patient_form.last_name.value;
    const email = edit_patient_form.email.value;
    const date_of_birth = edit_patient_form.date_of_birth.value;
    const phone = edit_patient_form.phone.value;
    const ward = edit_patient_form.ward.value;
    const address = edit_patient_form.address.value;    
    const diagnosis = edit_patient_form.diagnosis.value;
    const patient_id = edit_patient_form.patient_id.value;

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
        const res = await fetch(`/patients/${patient_id}/edit`, {
            method: "PUT",
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                date_of_birth,
                phone,
                ward,
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