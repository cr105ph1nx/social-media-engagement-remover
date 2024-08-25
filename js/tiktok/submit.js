const tiktokStartButton = document.getElementById("tiktok-start");
// Event listener for the init button to reset the form
tiktokStartButton.addEventListener("click", async (event) => {
  // Prevent default form submission
  event.preventDefault();
  // Define operation
  const operation = document.getElementById("tiktok-op-type");
  const value = operation.value;

  // Disable input
  if (value !== "") {
    tiktokStartButton.disabled = true;
    operation.disabled = true;
  }
  // Sending chrome message
  switch (value) {
    case "tiktok-likes":
      chrome.runtime.sendMessage({ event: "ON_TIKTOK_LIKES_START" });
      break;
    case "tiktok-favorites":
      chrome.runtime.sendMessage({ event: "ON_TIKTOK_FAVORITES_START" });
      break;
    case "tiktok-reposts":
      chrome.runtime.sendMessage({ event: "ON_TIKTOK_REPOSTS_START" });
      break;
    default:
      break;
  }
});
