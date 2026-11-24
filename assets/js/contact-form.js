/* Greenshield & Company – contact form (sends via Web3Forms) */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = form.querySelector(".form-status");
  var button = form.querySelector('button[type="submit"]');
  var buttonText = button.textContent;
  var FALLBACK = "Please email us directly at office@greenshield.company.";

  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = "form-status " + (type === "success" ? "is-success" : "is-error");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    statusEl.textContent = "";

    // 1. Check required fields (uses the browser's built-in validation)
    if (!form.checkValidity()) {
      var firstInvalid = form.querySelector(":invalid");
      if (firstInvalid && firstInvalid.type === "checkbox") {
        showStatus("Please agree to the processing of your details so we can answer your enquiry.", "error");
      } else if (firstInvalid && firstInvalid.type === "email" && firstInvalid.value) {
        showStatus("Please enter a valid email address.", "error");
      } else {
        showStatus("Please fill in your name, email address and message.", "error");
      }
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // 2. Form not set up yet? Then do not send anything.
    var key = form.querySelector('input[name="access_key"]').value;
    if (!key || key.indexOf("YOUR_") === 0) {
      showStatus("The contact form is not active yet. " + FALLBACK, "error");
      return;
    }

    // 3. Send the message
    button.disabled = true;
    button.textContent = "Sending…";

    var data = {};
    new FormData(form).forEach(function (value, name) { data[name] = value; });

    fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (response) { return response.json(); })
      .then(function (result) {
        if (result && result.success) {
          form.reset();
          showStatus("Thank you! Your message has been sent. We will get back to you shortly.", "success");
        } else {
          showStatus("Sorry, your message could not be sent. " + FALLBACK, "error");
        }
      })
      .catch(function () {
        showStatus("Sorry, your message could not be sent. " + FALLBACK, "error");
      })
      .then(function () {
        button.disabled = false;
        button.textContent = buttonText;
      });
  });
})();
