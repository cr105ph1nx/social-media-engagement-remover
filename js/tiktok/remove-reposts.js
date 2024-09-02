const removeTiktokReposts = async () => {
  const clickRepostsTab = async () => {
    try {
      const repostsTab = document.querySelector('[data-e2e="repost-tab"]');
      if (!repostsTab) {
        stopScript("The 'Reposts' tab not found on the page");
        return;
      }
      repostsTab.click();
      console.log("Successfully opened the 'Reposts' tab.");
      await sleep(3000);
    } catch (error) {
      stopScript("Error finding or clicking the 'Reposts' tab", error);
    }
  };

  const clickRepostedVideo = async () => {
    try {
      const firstVideo = document.querySelector(
        '[class*="DivPlayerContainer"]'
      );
      if (!firstVideo) {
        stopScript(
          "No reposted videos found. Your reposted videos list is empty"
        );
        return;
      }
      firstVideo.click();
      console.log("Successfully opened the first reposted video.");
      await sleep(3000);
    } catch (error) {
      stopScript(
        `Error finding or clicking the first reposted video: ${error.message}`,
        error
      );
    }
  };

  const clickNextRepostedVideoAndRemove = async () => {
    try {
      const interval = setInterval(async () => {
        const nextVideoButton = document.querySelector(
          '[data-e2e="arrow-right"]'
        );
        const respostButton = document.querySelector(
          '[data-e2e="video-share-repost"]'
        );

        if (!respostButton) {
          clearInterval(interval);
          stopScript("Could not find the repost button");
          return;
        }

        respostButton.click();
        console.log("Successfully removed the repost from the current video.");

        if (!nextVideoButton || nextVideoButton.disabled) {
          clearInterval(interval);
          closeVideo();
          return;
        }

        nextVideoButton.click();
        console.log("Clicked the next reposted video.");
      }, 5000);
    } catch (error) {
      clearInterval(interval);
      stopScript("Error occurred in the reposted video removal process", error);
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
    await clickRepostsTab();
    await clickRepostedVideo();
    await clickNextRepostedVideoAndRemove();
  } catch (error) {
    stopScript("Error in script", error);
  }
};

removeTiktokReposts();
