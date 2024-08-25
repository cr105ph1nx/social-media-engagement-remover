chrome.runtime.onMessage.addListener(async (data) => {
  try {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const { event } = data;
    switch (event) {
      case "ON_TIKTOK_LIKES_START":
        await chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["./js/tiktok/remove-likes.js"],
        });
        break;
      case "ON_TIKTOK_FAVORITES_START":
        await chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["./js/tiktok/remove-favorites.js"],
        });
        break;
      case "ON_TIKTOK_REPOSTS_START":
        await chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["./js/tiktok/remove-reposts.js"],
        });
        break;
      default:
        console.log("hmm what...");
        break;
    }
  } catch (error) {
    console.log({ message: "Error starting removal process.", error: error });
  }
});
