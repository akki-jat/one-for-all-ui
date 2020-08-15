export class Ripple {
  private static doRipple(this: HTMLElement, e: MouseEvent) {
    const { left, top } = this.getBoundingClientRect();
    const x = e.pageX - left;
    const y = e.pageY - top;
    const w = this.offsetWidth;

    const ripple = document.createElement("span");

    ripple.className = "one-for-all-ripple--ripple-element";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.setProperty("--scale", w.toString());

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.parentNode.removeChild(ripple);
    }, 500);
  }

  public static observe(element: Element) {
    element.addEventListener("mousedown", this.doRipple);
  }

  public static destroy(element: Element) {
    element.removeEventListener("mousedown", this.doRipple);
  }
}
