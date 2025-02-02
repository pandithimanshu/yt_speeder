document.getElementById('increase').addEventListener('click', () => {
    sendMessageToContentScript({ action: 'increase' });
  });
  
  document.getElementById('decrease').addEventListener('click', () => {
    sendMessageToContentScript({ action: 'decrease' });
  });
  
  document.getElementById('reset').addEventListener('click', () => {
    sendMessageToContentScript({ action: 'reset' });
  });
  
  function sendMessageToContentScript(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: controlVideoSpeed,
        args: [message]
      });
    });
  }
  
  function controlVideoSpeed({ action }) {
    const video = document.querySelector('video');
    if (video) {
      switch (action) {
        case 'increase':
          video.playbackRate += 0.1;
          break;
        case 'decrease':
          video.playbackRate = Math.max(0.1, video.playbackRate - 0.1);
          break;
        case 'reset':
          video.playbackRate = 1.0;
          break;
      }
    }
  }
  