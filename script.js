const form = document.getElementById("idstumo-form");
const message = document.getElementById("message");
const enterButton = document.getElementById("enter-button");
const waveButton = document.getElementById("wave-button");
const status = document.getElementById("status");

const FORM_ENDPOINT = "https://formsubmit.co/ajax/contact@idstumo.com";

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

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = message.value.trim();

  if (!text) {
    message.focus();
    return;
  }

  waveButton.disabled = true;
  setStatus("Waving…");

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        message: text,
        _subject: "Wave from idstumo.com",
        _template: "basic",
        _captcha: "false",
        _url: window.location.href
      })
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
      throw new Error("FormSubmit rejected the request.");
    }

    setStatus("Wave received.", "success");
    message.value = "";
  } catch (error) {
    /*
      Static sites cannot send email by themselves. If the free FormSubmit
      endpoint is not activated yet (or is temporarily unavailable), fall
      back to the visitor's normal mail app.
    */
    const subject = encodeURIComponent("Wave from idstumo.com");
    const body = encodeURIComponent(text);
    window.location.href =
      `mailto:contact@idstumo.com?subject=${subject}&body=${body}`;

    setStatus("Opening your mail app…", "success");
  } finally {
    waveButton.disabled = false;
    message.focus();
  }
});

// Put the cursor in the box on desktop. A short delay avoids fighting page load.
window.addEventListener("load", () => {
  window.setTimeout(() => message.focus(), 350);
});
