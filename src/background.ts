chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-title") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id!, { action: "copyTitle" });
      }
    });
  }
}); 
