// キーボードイベントを監視
document.addEventListener('keydown', (e) => {
  const keys: string[] = [];

  if (e.ctrlKey) keys.push('Ctrl');
  if (e.metaKey) keys.push('Command');
  if (e.altKey) keys.push('Alt');
  if (e.shiftKey) keys.push('Shift');

  // 修飾キー以外のキーを追加
  if (e.key !== 'Control' && e.key !== 'Meta' && e.key !== 'Alt' && e.key !== 'Shift') {
    keys.push(e.key.toUpperCase());
  }

  const pressedKeys = keys.join('+');

  // バックグラウンドスクリプトにショートカットをチェック
  chrome.runtime.sendMessage({
    action: "checkShortcut",
    keys: pressedKeys
  });
});

// バックグラウンドスクリプトからのメッセージを処理
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "copyTitle") {
    const title = document.title;
    const url = window.location.href;
    const markdown = `[${title}](${url})`;

    navigator.clipboard.writeText(markdown).then(() => {
      // 通知の表示
      const notification = document.createElement('div');
      notification.textContent = 'Title copied in markdown format!';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        z-index: 10000;
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2000);
    });
  }
});
