const form = document.getElementById("idstumo-form");
const message = document.getElementById("message");
const enterButton = document.getElementById("enter-button");
const status = document.getElementById("status");

const CONTACT = "contact@idstumo.com";

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
  let href = `mailto:${CONTACT}?subject=${subject}`;
  if (text) {
    href += `&body=${encodeURIComponent(text)}`;
  }

  // 1) Try to open the visitor's default mail app. This works on phones and on
  //    any computer that has a default email program set.
  window.location.href = href;

  // 2) A mailto: link silently does nothing when no default mail app is set
  //    (common on desktops), so always leave a reliable fallback: copy the
  //    address to the clipboard and show it, so they can reach us either way.
  const copy = navigator.clipboard && navigator.clipboard.writeText(CONTACT);
  if (copy && copy.then) {
    copy.then(
      () => setStatus(`Address copied — email ${CONTACT}`, "success"),
      () => setStatus(`Email ${CONTACT}`, "success")
    );
  } else {
    setStatus(`Email ${CONTACT}`, "success");
  }

  message.focus();
});

// Put the cursor in the box on desktop. A short delay avoids fighting page load.
window.addEventListener("load", () => {
  window.setTimeout(() => message.focus(), 350);
});
