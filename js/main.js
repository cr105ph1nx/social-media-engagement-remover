// ON-CLICK HANDLER
const showTab = (tabId) => {
  // Hide all tab content
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((content) => {
    content.style.display = "none";
  });

  // Remove active class from all tabs
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Hide welcome text
  document.getElementById("welcome-text").style.display = "none";

  // Show the selected tab content
  if (tabId === "home") {
    document.getElementById("welcome-text").style.display = "block";
  } else {
    const selectedContent = document.getElementById(tabId);
    selectedContent.style.display = "block";

    // Add active class to the selected tab
    document.querySelector(`button#btn-${tabId}`).classList.add("active");
  }
};

// DEFINE TAB BUTTONS
const homeButton = document.getElementById("btn-home");
const ytButton = document.getElementById("btn-youtube");
const fbButton = document.getElementById("btn-facebook");
const igButton = document.getElementById("btn-instagram");
const ttButton = document.getElementById("btn-tiktok");

// ON-CLICK LISTENERS
homeButton.addEventListener("click", () => showTab("home"));
ytButton.addEventListener("click", () => showTab("youtube"));
igButton.addEventListener("click", () => showTab("instagram"));
fbButton.addEventListener("click", () => showTab("facebook"));
ttButton.addEventListener("click", () => showTab("tiktok"));
