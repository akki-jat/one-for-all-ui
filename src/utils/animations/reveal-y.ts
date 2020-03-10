export class revealY {
  public static show(element: Element) {
    return element?.animate(
      [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
      { duration: 250 }
    );
  }

  public static hide(element: Element) {
    return element?.animate(
      [{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }],
      {
        duration: 250
      }
    );
  }
}
