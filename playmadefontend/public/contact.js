document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    try {
        const response = await fetch("https://playmadebackend.vercel.app/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || "Failed to send email"}`);
        } else {
            alert("Message sent successfully!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending the email.");
    }
});
