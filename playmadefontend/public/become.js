// Include SweetAlert2 for toast notifications
function showNotification(title, message, isSuccess) {
    Swal.fire({
        title: title,
        text: message,
        icon: isSuccess ? "success" : "error",
        confirmButtonText: "Done",
        confirmButtonColor: "#F45C0F", // PlayMade Orange
    });
}

document.querySelector("#partner-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Gather form data
    const formData = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        city: document.getElementById("city").value,
        organization_type: document.getElementById("organization_type").value,
        message: document.getElementById("message").value,
    };

    // Check for missing fields
    for (const key in formData) {
        if (!formData[key]) {
            showNotification("Missing Field", `Please fill in the ${key.replace(/_/g, ' ').toLowerCase()}.`, false);
            return; // Stop form submission if any required field is missing
        }
    }

    console.log("Form data to send:", formData);

    try {
        const response = await fetch("https://playmade-backend2.vercel.app/become-partner", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const responseData = await response.json();
        console.log("Response status:", response.status);
        console.log("Response data:", responseData);

        if (!response.ok) {
            showNotification("Error", responseData.message || "Failed to send request", false);
        } else {
            showNotification("Success!", "Your partnership request has been sent successfully.", true);
            event.target.reset();  // <-- Reset form fields after successful submission
        }
    } catch (error) {
        console.error("Error occurred while sending the request:", error);
        showNotification("Error", "An unexpected error occurred. Please try again later.", false);
    }
});
