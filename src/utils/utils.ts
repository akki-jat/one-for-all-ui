export const stopClickPropagation = (ev: MouseEvent) => {
  ev.stopPropagation();
};

export const isElementVisibleInViewportAndParent = (el: Element, elParentEl?: HTMLElement) => {
  const parentIgnoreMargin = 10;
  const rect = el.getBoundingClientRect();
  const parentRect = elParentEl.getBoundingClientRect();

  return (
    // checks if element is visible in viewport
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    // checks if element is visible in parent element
    rect.top >= parentRect.top &&
    rect.left >= parentRect.left - parentIgnoreMargin &&
    rect.bottom <= parentRect.bottom + parentIgnoreMargin &&
    rect.right <= parentRect.right + parentIgnoreMargin
  );
}
