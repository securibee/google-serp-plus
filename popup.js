chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  if (!tab.url.includes("google.com")) {
    document.getElementById("none").style.display = "block";
  } else {
    document.getElementById("copy").style.display = "block";
    document.getElementById("open").style.display = "block";
    document.getElementById("copy").onclick = function copyUrls() {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          msg: { action: "copy_urls" },
        });
      });
      window.close();
    };
    document.getElementById("open").onclick = function openUrls() {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          msg: { action: "open_urls" },
        });
      });
      window.close();
    };
  }
});
