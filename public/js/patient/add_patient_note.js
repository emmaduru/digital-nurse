const add_patient_note_form = document.querySelector("#add-patient-note-form");

add_patient_note_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = add_patient_note_form.body.value;
    const patient_id = add_patient_note_form.patient_id.value;

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
        const res = await fetch(`/patients/${patient_id}/add_note`, {
            method: "POST",
            body: JSON.stringify({body}),
            headers: {"Content-Type": "application/json"}
        });
        const data = await res.json();

        if (data.success) {
            location.replace(`/patients/${patient_id}`)
        } else {
            set_form_err_content(data.message);
        }
    } catch (err) {
        console.log(err);
    }
})