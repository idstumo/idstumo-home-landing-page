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

  setStatus("");

  // When a mail app opens, the page loses focus / becomes hidden. Watch for
  // that: if it never happens, there's likely no default mail app, so show the
  // address as a fallback.
  let mailAppOpened = false;
  const markOpened = () => { mailAppOpened = true; };
  window.addEventListener("blur", markOpened, { once: true });
  document.addEventListener("visibilitychange", markOpened, { once: true });

  window.location.href = href;

  window.setTimeout(() => {
    window.removeEventListener("blur", markOpened);
    document.removeEventListener("visibilitychange", markOpened);
    if (!mailAppOpened && !document.hidden) {
      setStatus(`email ${CONTACT}`, "success");
    }
  }, 1200);
});

// Put the cursor in the box on desktop. A short delay avoids fighting page load.
window.addEventListener("load", () => {
  window.setTimeout(() => message.focus(), 350);
});
