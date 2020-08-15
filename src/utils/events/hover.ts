export class HoverEvent {
  constructor(public callback: (isHover: boolean) => void) {}

  private handleMouseOver() {
    this.callback(true);
  }

  private handleMouseOut() {
    this.callback(false);
  }

  public observe(element: Element) {
    element?.addEventListener("mouseover", this.handleMouseOver.bind(this));
    element?.addEventListener("mouseout", this.handleMouseOut.bind(this));
  }

  public stop(element: Element) {
    element?.removeEventListener("mouseover", this.handleMouseOver.bind(this));
    element?.removeEventListener("mouseout", this.handleMouseOut.bind(this));
  }
}
