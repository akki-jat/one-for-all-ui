import { Component, h, Prop, Watch, Element } from "@stencil/core";
import { revealY } from "../../animations";

@Component({
  tag: "dark-shadow",
  styleUrl: "dark-shadow.css",
  shadow: true
})
export class DarkShadow {
  @Element() el: HTMLElement;
  @Prop() isDarkOutside = true;
  @Prop() width = "auto";
  @Prop() showCloseIcon = true;
  @Prop() showHeader = true;
  @Prop() showFooter = true;
  @Prop() title = "";
  @Prop() animation = { open: null, close: null };

  @Watch("animation")
  animationPropWatcher() {
    if (this.animation) {
      if (!this.animation.open) {
        this.animation.open = (element: HTMLElement) => revealY.show(element);
      }

      if (!this.animation.close) {
        this.animation.close = (element: HTMLElement) => revealY.hide(element);
      }
    }
  }

  public animate(el: HTMLElement, mode: "open" | "close") {
    if (this.animation) {
      if (mode === "open") {
        this.animation.open(el);
      } else {
        this.animation.close(el);
      }
    }
  }

  componentDidLoad() {
    this.animationPropWatcher();
    this.animate(this.el.shadowRoot.querySelector(".dark-shadow"), "open");
  }

  render() {
    return (
      <div
        class={{
          "dark-shadow-container": true,
          "dark-outside": this.isDarkOutside
        }}
      >
        <div class="dark-shadow" style={{ width: this.width, display: "none" }}>
          {this.showHeader ? (
            <slot name="header">
              <div class="dark-shadow-header">
                {this.showCloseIcon ? (
                  <slot name="header-close-icon">
                    <i class="one-for-all-icon close-icon"></i>
                  </slot>
                ) : null}
                <h2 class="title">{this.title || "Dark Shadow"}</h2>
              </div>
            </slot>
          ) : null}
          <slot name="body">
            <div class="dark-shadow-body">
              <slot>
                This Quirk allows the user to host a shadow-like monster inside
                their body. <br /> Dark Shadow has been known to be able to
                speak and think as it's own being. Dark Shadow can be strengthen
                by negative emotions and the darker a place is, but it also gets
                harder to control. <br /> Users: Fumikage Tokoyami
              </slot>
            </div>
          </slot>
          {this.showFooter ? (
            <slot name="footer">
              <div class="dark-shadow-footer">
                <button type="button">Ok</button>
                <button type="button">Cancel</button>
              </div>
            </slot>
          ) : null}
        </div>
      </div>
    );
  }
}
