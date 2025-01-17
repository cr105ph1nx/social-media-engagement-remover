const removeTiktokLikes = async () => {
  const clickLikedTab = async () => {
    try {
      const likedTab = document.querySelector('[data-e2e="liked-tab"]');
      if (!likedTab) {
        stopScript("The 'Liked' tab not found on the page");
        return;
      }
      likedTab.click();
      console.log("Successfully opened the 'Liked' tab.");
      await sleep(3000);
    } catch (error) {
      stopScript("Error finding or clicking the 'Liked' tab", error);
    }
  };

  const clickLikedVideo = async () => {
    try {
      const firstVideo = document.querySelector(
        '[class*="DivPlayerContainer"]'
      );
      if (!firstVideo) {
        stopScript("No liked videos found. Your liked videos list is empty");
        return;
      }
      firstVideo.click();
      console.log("Successfully opened the first liked video.");
      await sleep(3000);
    } catch (error) {
      stopScript(
        `Error finding or clicking the first liked video: ${error.message}`,
        error
      );
    }
  };

  const clickNextLikedVideoAndRemove = async () => {
    try {
      const interval = setInterval(async () => {
        const nextVideoButton = document.querySelector(
          '[data-e2e="arrow-right"]'
        );
        const likeButton = document.querySelector(
          '[data-e2e="browse-like-icon"]'
        );

        if (!likeButton) {
          clearInterval(interval);
          stopScript("Could not find the like button");
          return;
        }

        likeButton.click();
        console.log("Successfully removed the liked from the current video.");

        if (!nextVideoButton || nextVideoButton.disabled) {
          clearInterval(interval);
          closeVideo();
          return;
        }

        nextVideoButton.click();
        console.log("Clicked the next liked video.");
      }, 5000);
    } catch (error) {
      clearInterval(interval);
      stopScript("Error occurred in the liked video removal process", error);
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
    await clickLikedTab();
    await clickLikedVideo();
    await clickNextLikedVideoAndRemove();
  } catch (error) {
    stopScript("Error in script", error);
  }
};

removeTiktokLikes();
