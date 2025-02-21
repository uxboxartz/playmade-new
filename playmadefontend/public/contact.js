// Function to show a SweetAlert2 notification
function showNotification(title, message, isSuccess) {
    Swal.fire({
        title: title,
        text: message,
        icon: isSuccess ? "success" : "error",
        confirmButtonText: "OK",
    });
}

document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    try {
        const response = await fetch("https://playmade-backend2.vercel.app/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
            showNotification("Error", result.message || "Failed to send email", false);
        } else {
            showNotification("Success!", "Your message has been sent successfully.", true);
            this.reset();  // <-- Reset form fields after successful submission
        }
    } catch (error) {
        console.error("Error:", error);
        showNotification("Error", "An unexpected error occurred. Please try again later.", false);
    }
});
