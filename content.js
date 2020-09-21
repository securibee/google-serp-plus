const doc = document;
const links = [...document.querySelectorAll("div.g>div>div>a:first-child")];

links.forEach((link) => {
  const url = link.href;
  const node = doc.createElement("p");
  const textnode = doc.createTextNode(url);
  link.closest(".g").classList.add("result-block");
  node.appendChild(textnode);
  node.classList.add("full-link");
  if (link.href.length > 91) node.classList.add("long-boy");
  link.parentNode;
  link.after(node);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg.action === "copy_urls") {
    const textarea = doc.createElement("textarea");
    const selection = doc.getSelection();
    textarea.textContent = links.map((link) => link.href).join("\n");
    doc.body.appendChild(textarea);
    selection.removeAllRanges();
    textarea.select();
    doc.execCommand("copy");
    doc.body.removeChild(textarea);
  } else if (request.msg.action === "open_urls") {
    links.forEach((link) => {
      window.open(link.href);
    });
  }
});

