// Copyright (c) 2026 Zack Stephens

const anchorSelector = "main a[href^=http][h]";
const anchorAncestorSelector = "li";

function decodeLink(element: HTMLAnchorElement): string | null {
  const href = element.getAttribute("href");
  const url = new URL(href || "", "about://blank");
  if (!url.hostname.match(/\.bing\.com$/)) {
    return null;
  }
  if (url.pathname !== "/ck/a") {
    return null;
  }
  const params = new URLSearchParams(url.search);
  const u = params.get("u");
  if (!u) {
    return null;
  }
  // The url seems to start with a couple invalid characters, so we trim them off.
  let cleanedUpUrl = u.substring(2);
  let modulus = cleanedUpUrl.length % 4;
  if (modulus > 0) {
    cleanedUpUrl += "=".repeat(4 - modulus);
  }
  cleanedUpUrl = cleanedUpUrl.replace(/-/g, "+").replace(/_/g, "/");
  const decodedUrl = atob(cleanedUpUrl);
  const realUrl = decodeURIComponent(decodedUrl);
  return realUrl;
}

function tryUpdateAnchorSectionTitle(element: HTMLAnchorElement) {
  const realUrl = decodeLink(element);
  if (realUrl) {
    element.closest(anchorAncestorSelector)?.setAttribute("title", realUrl);
  }
}

document.querySelectorAll(anchorSelector).forEach((element) => {
  tryUpdateAnchorSectionTitle(element as HTMLAnchorElement);
});

const anchorObserver = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'A' && (node as HTMLElement).matches(anchorSelector)) {
        tryUpdateAnchorSectionTitle(node as HTMLAnchorElement);
      }
    }
  }
});

anchorObserver.observe(document.body, { childList: true, subtree: true });
