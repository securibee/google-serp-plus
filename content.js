const doc = document;
const links = [...document.querySelectorAll('div.r>a:first-child')]

links.forEach(link => {
  const url = link.href;
  const node = doc.createElement("p");
  const textnode = doc.createTextNode(url);
  node.appendChild(textnode);
  node.classList.add('full-link')
  link.after(node);
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      const textarea = doc.createElement("textarea");
      const selection = doc.getSelection();
      textarea.textContent = links.map(link=>link.href).join("\n");
      doc.body.appendChild(textarea);
      selection.removeAllRanges();
      textarea.select();
      doc.execCommand("copy");
      doc.body.removeChild(textarea);
    }
  }
);