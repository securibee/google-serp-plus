[...document.querySelectorAll('div.r>a:first-child')].forEach(link => {
    const url = link.href;
    console.log({url})
    const node = document.createElement("p");
    const textnode = document.createTextNode(url);
    node.appendChild(textnode);
    node.classList.add('full-link')
    link.after(node);
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      const doc = document;
      const textarea = doc.createElement("textarea");
      const selection = doc.getSelection();
      textarea.textContent=[...doc.querySelectorAll("div.r>a:first-child")].map(link=>link.href).join("\n");
      doc.body.appendChild(textarea);
      selection.removeAllRanges();
      textarea.select();
      doc.execCommand("copy");
      doc.body.removeChild(textarea);
      // chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
  }
);