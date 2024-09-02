const removeTiktokFavorites = async () => {
  const clickFavoritesTab = async () => {
    try {
      const favoriteTab = document.querySelector('[class*="PFavorite"]');
      if (!favoriteTab) {
        stopScript("The 'Favorites' tab not found on the page");
        return;
      }
      favoriteTab.click();
      console.log("Successfully opened the 'Favorites' tab.");
      await sleep(3000);
    } catch (error) {
      stopScript("Error finding or clicking the 'Favorites' tab", error);
    }
  };

  const clickFavoritedVideo = async () => {
    try {
      const firstVideo = document.querySelector(
        '[class*="DivPlayerContainer"]'
      );
      if (!firstVideo) {
        stopScript(
          "No favorited videos found. Your favorited videos list is empty"
        );
        return;
      }
      firstVideo.click();
      console.log("Successfully opened the first favorited video.");
      await sleep(3000);
    } catch (error) {
      stopScript(
        `Error finding or clicking the first favorited video: ${error.message}`,
        error
      );
    }
  };

  const clickNextFavoritedVideoAndRemove = async () => {
    try {
      const interval = setInterval(async () => {
        const nextVideoButton = document.querySelector(
          '[data-e2e="arrow-right"]'
        );
        const favoriteButton = document.querySelector(
          '[data-e2e="undefined-icon"]'
        );

        if (!favoriteButton) {
          clearInterval(interval);
          stopScript("Could not find the favorite button");
          return;
        }

        favoriteButton.click();
        console.log(
          "Successfully removed the favorite from the current video."
        );

        if (!nextVideoButton || nextVideoButton.disabled) {
          clearInterval(interval);
          closeVideo();
          return;
        }

        nextVideoButton.click();
        console.log("Clicked the next favorite video.");
      }, 5000);
    } catch (error) {
      clearInterval(interval);
      stopScript(
        "Error occurred in the favorited video removal process",
        error
      );
    }
  };

  const closeVideo = async () => {
    try {
      const closeVideoButton = document.querySelector(
        '[data-e2e="browse-close"]'
      );
      if (closeVideoButton) {
        closeVideoButton.click();
        console.log("Successfully closed the video.");
        stopScript("Script completed: All actions executed successfully");
      } else {
        stopScript("Could not find the close video button");
      }
    } catch (error) {
      stopScript("Error occurred while trying to close the video", error);
    }
  };

  const stopScript = (message, error = "") => {
    let logMessage = `${message}. Stopping script...`;
    if (error) {
      console.log({ message: logMessage, error: error });
    } else {
      console.log(logMessage);
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    await clickFavoritesTab();
    await clickFavoritedVideo();
    await clickNextFavoritedVideoAndRemove();
  } catch (error) {
    stopScript("Error in script", error);
  }
};

removeTiktokFavorites();
