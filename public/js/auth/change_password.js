const change_password_form = document.querySelector("#change-password-form");

change_password_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const old_password = change_password_form.old_password.value;
    const password = change_password_form.password.value;
    const confirm_password = change_password_form.confirm_password.value;

    const form_err = document.querySelector(".form-err");
    const set_form_err_content = (err) => {
        form_err.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${err}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
    }
    if (password !== confirm_password) {
        set_form_err_content("Password fields must match.");
        return;
    }

    try {
        const res = await fetch("/change_password", {
            method: "POST",
            body: JSON.stringify({old_password, password}),
            headers: {"Content-Type": "application/json"}
        });
        const data = await res.json();

        if (data.success) {
            location.replace("/logout");
        } else {
            set_form_err_content(data.message);
        }
    } catch (err) {
        console.log(err);
    }
})