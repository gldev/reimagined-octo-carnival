let scheduled = false;

function hideCommentsBlock() {
  const COMMENTS_TITLES = ["Comments", "Comentarios"];

  const h2s = document.querySelectorAll("h2");

  h2s.forEach((h2) => {
    const text = (h2.textContent || "").trim();

    if (!COMMENTS_TITLES.includes(text)) {return;}

    let container = h2;

    for (let i = 0; i < 6; i++) {
      container = container.parentElement;
      if (!container) {break;}

      if (container.dataset.blockedCommentsBlock === "1") {return;}

      if (i > 2) {
        container.dataset.blockedCommentsBlock = "1";
        container.style.display = "none";
        return;
      }
    }
  });
}

function hideSecondaryCommentBlock() {
  const SPAN_TITLES = ["Most relevant", "Más importantes"];

  const spans = document.querySelectorAll("span");

  spans.forEach((span) => {
    const text = (span.textContent || "").trim();

    if (!SPAN_TITLES.includes(text)) {return;}

    let container = span;

    for (let i = 0; i < 4; i++) {
      container = container.parentElement;
      if (!container) {return;}

      if (container.dataset.blockedCommentsBlock === "1") {return;}

      if (i > 2) {
        container.dataset.blockedCommentsBlock = "1";
        container.style.display = "none";
        return;
      }
    }
  });
}

function blockCommentUi() {
  scheduled = false;

  const COMMENT_ARIA_LABELS = [
    "Leave a comment",
    "Write a comment",
    "Deja un comentario",
    "Escribe un comentario",
  ];

  const selectors = COMMENT_ARIA_LABELS.map(
    (label) => `[aria-label="${label}"]`,
  ).join(",");

  const components = document.querySelectorAll(selectors);
  components.forEach((component) => {
    if (component.dataset.blockedComment === "1") {return;}

    component.style.cursor = "not-allowed";
    component.dataset.blockedComment = 1;
    component.style.pointerEvents = "none";
    component.style.opacity = "0.45";
  });
}

function schedule(fn) {
  if (scheduled) {return;}

  scheduled = true;

  requestAnimationFrame(() => {
    scheduled = false;
    fn();
  });
}

function blockProcess() {
  blockCommentUi();
  hideCommentsBlock();
  hideSecondaryCommentBlock();
}

function startObserver() {
  schedule(blockProcess);

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.addedNodes && m.addedNodes.length > 0) {
        schedule(blockProcess);
        break;
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("popstate", blockProcess);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startObserver);
} else {
  startObserver();
}
