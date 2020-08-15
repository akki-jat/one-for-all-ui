import { Component, h, Prop, State, Element } from "@stencil/core";
import { HoverEvent } from "../../utils/events/hover";
import { Ripple } from "../../utils/animations/ripple";

@Component({
  tag: "zero-gravity-button",
  styleUrl: "zero-gravity-button.css",
})
export class ZeroGravityButton {
  @Element() el: Element;
  @Prop() ripple = true;
  @Prop() elevation = 2;
  @Prop() overlap = false;
  @Prop() hoverElevation = 0;
  @Prop() variant: "round" | "extended" = "round";
  @Prop() color: "primary" | "secondary" = "primary";
  @Prop() size: "small" | "medium" | "large" = "large";
  @Prop() radius = this.variant.toLowerCase() === "round" ? "50%" : "26px";
  @Prop() position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "enter-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right" = "bottom-right";

  @State() isHover = false;

  private hoverEvent = new HoverEvent((isHover: boolean) => {
    this.isHover = isHover;
  });

  get ZeroGravityButtonEl() {
    return this.el.querySelector(".zero-gravity-button");
  }

  componentDidLoad() {
    this.hoverEvent.observe(this.ZeroGravityButtonEl);
    Ripple.observe(this.ZeroGravityButtonEl);
  }

  disconnectedCallback() {
    this.hoverEvent.stop(this.ZeroGravityButtonEl);
    Ripple.destroy(this.ZeroGravityButtonEl);
  }

  render() {
    return (
      <button
        class={`zero-gravity-button one-for-all-ripple size-${this.size.toLowerCase()} one-for-all-elevation-${
          this.isHover && this.hoverElevation
            ? this.hoverElevation
            : this.elevation
        } color-${this.color.toLowerCase()} variant-${this.variant.toLowerCase()} ${this.position.toLowerCase()} ${
          this.overlap ? "overlap" : ""
        }`}
        type="button"
        style={{ borderRadius: this.radius }}
      >
        <slot></slot>
      </button>
    );
  }
}
