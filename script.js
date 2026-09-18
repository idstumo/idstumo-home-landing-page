const form = document.getElementById("idstumo-form");
const message = document.getElementById("message");
const enterButton = document.getElementById("enter-button");
const status = document.getElementById("status");

function setStatus(text, kind = "") {
  status.textContent = text;
  status.className = `status ${kind}`.trim();
}

enterButton.addEventListener("click", () => {
  if (message.value.trim()) {
    setStatus("It's not your time", "error");
  } else {
    setStatus("");
  }
  message.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = message.value.trim();
  const subject = encodeURIComponent("Wave from idstumo.com");

  // Always open the visitor's default email app, addressed to contact@idstumo.com.
  // If they typed a message, carry it into the email body.
  let href = `mailto:contact@idstumo.com?subject=${subject}`;
  if (text) {
    href += `&body=${encodeURIComponent(text)}`;
  }
  window.location.href = href;

  setStatus("Opening your mail app…", "success");
  message.focus();
});

// Put the cursor in the box on desktop. A short delay avoids fighting page load.
window.addEventListener("load", () => {
  window.setTimeout(() => message.focus(), 350);
});
