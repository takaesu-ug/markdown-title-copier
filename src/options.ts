document.addEventListener('DOMContentLoaded', () => {
  const shortcutInput = document.getElementById('shortcut') as HTMLInputElement;
  const saveButton = document.getElementById('save') as HTMLButtonElement;
  const statusDiv = document.getElementById('status') as HTMLDivElement;

  // 現在のショートカットを読み込む
  chrome.storage.sync.get(['customShortcut'], (result) => {
    if (result.customShortcut) {
      shortcutInput.value = result.customShortcut;
    }
  });

  // ショートカットキーの入力を処理
  shortcutInput.addEventListener('keydown', (e) => {
    e.preventDefault();
    const keys: string[] = [];
    
    if (e.ctrlKey) keys.push('Ctrl');
    if (e.metaKey) keys.push('Command');
    if (e.altKey) keys.push('Alt');
    if (e.shiftKey) keys.push('Shift');
    
    // 修飾キー以外のキーを追加
    if (e.key !== 'Control' && e.key !== 'Meta' && e.key !== 'Alt' && e.key !== 'Shift') {
      keys.push(e.key.toUpperCase());
    }
    
    shortcutInput.value = keys.join('+');
  });

  // 設定を保存
  saveButton.addEventListener('click', () => {
    const shortcut = shortcutInput.value;
    
    if (shortcut) {
      chrome.storage.sync.set({ customShortcut: shortcut }, () => {
        showStatus('Settings saved successfully!', 'success');
        
        // バックグラウンドスクリプトに新しいショートカットを通知
        chrome.runtime.sendMessage({ 
          action: 'updateShortcut', 
          shortcut: shortcut 
        });
      });
    } else {
      showStatus('Please enter a valid shortcut', 'error');
    }
  });

  function showStatus(message: string, type: 'success' | 'error') {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  }
}); 
