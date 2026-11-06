// FAQ Accordion Logic

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
        const isOpen = answer.style.maxHeight;

        // Close all
        document.querySelectorAll(".faq-answer").forEach(a => {
            a.style.maxHeight = null;
        });

        // Open clicked
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});


















const form = document.getElementById("orderForm");
const modal = document.getElementById("customModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalBtn = document.getElementById("modalBtn");

function showModal(title, message, type = "success") {
    modalTitle.textContent = title;
    modalMessage.textContent = message;

    modal.classList.remove("modal-success", "modal-error");
    modal.classList.add(type === "success" ? "modal-success" : "modal-error");

    modal.classList.add("active");
}

modalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    const fullname = formData.get("fullname").trim();
    const phone = formData.get("phone").trim();
    const location = formData.get("location").trim();
    const altPhone = formData.get("alternative_phone").trim();

    const phoneRegex = /^[0-9+\-\s]{7,15}$/;

    if (!fullname || !phone || !location) {
        showModal("Missing Fields", "Please fill in all required fields.", "error");
        return;
    }

    if (!phoneRegex.test(phone)) {
        showModal("Invalid Phone", "Enter a valid phone number.", "error");
        return;
    }

    if (altPhone && !phoneRegex.test(altPhone)) {
        showModal("Invalid Alternative Phone", "Enter a valid alternative phone number.", "error");
        return;
    }

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            showModal("Success 🎉", "Your order has been submitted successfully!", "success");
            form.reset();
        } else {
            showModal("Submission Failed", "Something went wrong. Please try again.", "error");
        }
    })
    .catch(() => {
        showModal("Network Error", "Check your internet connection and try again.", "error");
    });
});


























// imperial.js - Handles form submission, validation, and FAQ accordion logic for the Imperial product landing page.
// const form = document.getElementById("orderForm");
// const submitBtn = form.querySelector("button[type='submit']");
// const modal = document.getElementById("customModal");
// const modalTitle = document.getElementById("modalTitle");
// const modalMessage = document.getElementById("modalMessage");
// const modalBtn = document.getElementById("modalBtn");

// // Prevent rapid resubmissions (5 seconds cooldown)
// let lastSubmissionTime = 0;

// function showModal(title, message, type = "success") {
//     modalTitle.textContent = title;
//     modalMessage.textContent = message;

//     modal.classList.remove("modal-success", "modal-error");
//     modal.classList.add(type === "success" ? "modal-success" : "modal-error");

//     modal.classList.add("active");
// }

// modalBtn.addEventListener("click", () => {
//     modal.classList.remove("active");
// });

// // Basic Sanitizer (removes script-related characters)
// function sanitizeInput(input) {
//     return input.replace(/[<>{}]/g, "").trim();
// }

// form.addEventListener("submit", function(e) {
//     e.preventDefault();

//     const now = Date.now();
//     if (now - lastSubmissionTime < 5000) {
//         showModal("Slow Down ⏳", "Please wait before submitting again.", "error");
//         return;
//     }

//     const formData = new FormData(form);

//     // Honeypot check
//     if (formData.get("website")) {
//         return; // silently block bots
//     }

//     let fullname = sanitizeInput(formData.get("fullname") || "");
//     let phone = sanitizeInput(formData.get("phone") || "");
//     let location = sanitizeInput(formData.get("location") || "");
//     let altPhone = sanitizeInput(formData.get("alternative_phone") || "");

//     // Normalize phone (remove spaces & dashes)
//     phone = phone.replace(/[\s\-]/g, "");
//     altPhone = altPhone.replace(/[\s\-]/g, "");

//     // Kenyan + general phone validation
//     const phoneRegex = /^(?:\+254|254|0)?(7\d{8}|1\d{8})$/;

//     if (!fullname || !phone || !location) {
//         showModal("Missing Fields", "Please fill in all required fields.", "error");
//         return;
//     }

//     if (!phoneRegex.test(phone)) {
//         showModal("Invalid Phone", "Enter a valid Kenyan mobile number.", "error");
//         return;
//     }

//     if (altPhone && !phoneRegex.test(altPhone)) {
//         showModal("Invalid Alternative Phone", "Enter a valid alternative phone number.", "error");
//         return;
//     }

//     // Update sanitized values back into form
//     formData.set("fullname", fullname);
//     formData.set("phone", phone);
//     formData.set("location", location);
//     formData.set("alternative_phone", altPhone);

//     // Disable button while submitting
//     submitBtn.disabled = true;
//     submitBtn.textContent = "Submitting...";

//     fetch(form.action, {
//         method: "POST",
//         body: formData,
//         headers: { 'Accept': 'application/json' }
//     })
//     .then(response => {
//         if (response.ok) {
//             lastSubmissionTime = Date.now();
//             showModal("Order Successfully Submitted", "We are contacting you shortly. Thank You!", "success");
//             form.reset();
//         } else {
//             showModal("Submission Failed", "Something went wrong. Please try again.", "error");
//         }
//     })
//     .catch(() => {
//         showModal("Network Error", "Check your internet connection and try again.", "error");
//     })
//     .finally(() => {
//         submitBtn.disabled = false;
//         submitBtn.textContent = "Submit Order";
//     });
// });



