// カスタムショートカットを保存する変数
let customShortcut: string | null = null;

// 初期設定を読み込む
chrome.storage.sync.get(['customShortcut'], (result) => {
  if (result.customShortcut) {
    customShortcut = result.customShortcut;
  }
});

// ショートカットコマンドの処理
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

// オプションページからのメッセージを処理
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateShortcut") {
    customShortcut = message.shortcut;
  }
}); 
