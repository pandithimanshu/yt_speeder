chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: controlVideoSpeed,
          args: [command]
        });
      }
    });
  });
  
  function controlVideoSpeed(command) {
    const video = document.querySelector("video");
    if (video) {
      switch (command) {
        case "increase_speed":
          video.playbackRate += 0.1;
          console.log(`Speed increased to ${video.playbackRate}`);
          break;
        case "decrease_speed":
          video.playbackRate = Math.max(0.1, video.playbackRate - 0.1);
          console.log(`Speed decreased to ${video.playbackRate}`);
          break;
        case "reset_speed":
          video.playbackRate = 1.0;
          console.log("Speed reset to 1.0");
          break;
      }
    } else {
      console.log("No video element found on this page.");
    }
  }
  