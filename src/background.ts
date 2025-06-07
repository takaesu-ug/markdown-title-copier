// カスタムショートカットを保存する変数
let customShortcut: string | null = null;

// 初期設定を読み込む
chrome.storage.sync.get(['customShortcut'], (result) => {
  if (result.customShortcut) {
    customShortcut = result.customShortcut;
  }
});

// キーボードイベントをリッスン
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateShortcut") {
    customShortcut = message.shortcut;
  } else if (message.action === "checkShortcut") {
    const pressedKeys = message.keys;
    if (customShortcut && pressedKeys === customShortcut) {
      // ショートカットが一致した場合、アクティブなタブにコピーコマンドを送信
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
          chrome.tabs.sendMessage(activeTab.id!, { action: "copyTitle" });
        }
      });
    }
  }
});
