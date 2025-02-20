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
            alert(`Please fill in the ${key.replace(/_/g, ' ').toLowerCase()}.`);
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
            alert(`Error: ${responseData.message || "Failed to send request"}`);
        } else {
            alert("Message sent successfully!");
        }
    } catch (error) {
        console.error("Error occurred while sending the request:", error);
        alert("An error occurred while sending the email.");
    }
});
