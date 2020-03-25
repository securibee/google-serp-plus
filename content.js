[...document.querySelectorAll('div.r>a:first-child')].forEach(link => {
    var url = link.href;
    console.log({url})
    var node = document.createElement("p");
    var textnode = document.createTextNode(url);
    node.appendChild(textnode);
    link.after(node);
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      doc=document;
      textarea=doc.createElement("textarea");
      selection=doc.getSelection();
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