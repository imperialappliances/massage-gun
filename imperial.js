// ===== FAQ Accordion =====
document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
        const isOpen = answer.style.maxHeight;

        // Close all
        document.querySelectorAll(".faq-answer").forEach(a => {
            a.style.maxHeight = null;
        });

        // Open clicked (unless it was already open)
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// ===== Order Form =====
const form = document.getElementById("orderForm");
const submitBtn = form.querySelector("button[type='submit']");
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

const phoneRegex = /^[0-9+\-\s]{7,15}$/;

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const fullname = (formData.get("fullname") || "").trim();
    const phone = (formData.get("phone") || "").trim();
    const location = (formData.get("location") || "").trim();
    const altPhone = (formData.get("alternative_phone") || "").trim();

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

    // Stop double-clicks while the request is in flight
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        let data = {};
        try { data = await response.json(); } catch (_) {}

        // Web3Forms replies with { success: true | false, message: "..." }
        const ok = response.ok && data.success === true;

        if (ok) {
            showModal("Success 🎉", "Your order has been submitted successfully!", "success");
            form.reset();
        } else {
            console.error("Web3Forms response:", response.status, data);
            showModal("Submission Failed", data.message || "Something went wrong. Please try again.", "error");
        }
    } catch (err) {
        console.error("Fetch error:", err, "| page origin:", window.location.origin);

        // Fallback: submit the form the normal way (full page POST), which isn't
        // affected by the browser restrictions that can block fetch().
        if (!form.dataset.fallbackTried) {
            form.dataset.fallbackTried = "true";
            HTMLFormElement.prototype.submit.call(form);
            return;
        }

        showModal("Network Error", "Check your internet connection and try again.", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});
