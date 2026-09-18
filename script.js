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

  if (!text) {
    message.focus();
    return;
  }

  const subject = encodeURIComponent("Wave from idstumo.com");
  const body = encodeURIComponent(text);

  // Open the visitor's normal/default email application.
  window.location.href =
    `mailto:contact@idstumo.com?subject=${subject}&body=${body}`;

  setStatus("Opening your mail app…", "success");
  message.focus();
});

// Put the cursor in the box on desktop. A short delay avoids fighting page load.
window.addEventListener("load", () => {
  window.setTimeout(() => message.focus(), 350);
});
