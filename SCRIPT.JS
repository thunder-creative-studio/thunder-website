const orderForm = document.getElementById("orderForm");
const submitOrder = document.getElementById("submitOrder");
const formStatus = document.getElementById("formStatus");

const formspreeEndpoint =
    "https://formspree.io/f/xljerdzz";


orderForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
    }

    submitOrder.disabled = true;
    submitOrder.textContent = "SENDING...";

    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {

        const formData = new FormData(orderForm);

        const response = await fetch(formspreeEndpoint, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Submission failed");
        }

        formStatus.textContent =
            "Your request was sent successfully.";

        formStatus.classList.add("success");

        orderForm.reset();

    } catch (error) {

        formStatus.textContent =
            "The request could not be sent. Please try again.";

        formStatus.classList.add("error");

    } finally {

        submitOrder.disabled = false;
        submitOrder.textContent = "SEND REQUEST ↗";

    }

});