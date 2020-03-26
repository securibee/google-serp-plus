document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('copy').onclick = function copyUrls() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        msg: { action: 'copy_urls' }
      });
    })
  }
  document.getElementById('open').onclick = function openUrls() {
    console.log('open')
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        msg: { action: 'open_urls' }
      });
    })
  }
});