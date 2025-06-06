chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "copyTitle") {
    const title = document.title;
    const url = window.location.href;
    const markdown = `[${title}](${url})`;
    
    navigator.clipboard.writeText(markdown).then(() => {
      // Optional: Show a notification that the title was copied
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
