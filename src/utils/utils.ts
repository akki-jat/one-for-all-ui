export const stopClickPropagation = (ev: MouseEvent) => {
  ev.stopPropagation();
};

export const isElementInViewport = (el: Element) => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
