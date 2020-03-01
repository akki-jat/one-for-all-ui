export class revealY {
  public static show(element: HTMLElement) {
    element.style.display = "block";
    return element.animate(
      [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
      { duration: 250 }
    );
  }

  public static hide(element: HTMLElement) {
    element.animate([{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }], {
      duration: 250
    }).onfinish = () => (element.style.display = "none");
  }
}
