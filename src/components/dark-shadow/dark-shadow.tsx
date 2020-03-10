import {
  Component,
  h,
  Prop,
  Watch,
  Element,
  Method,
  State
} from "@stencil/core";
import { revealY } from "../../utils/animations";
import { stopClickPropagation } from "../../utils/utils";

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
  @Prop() shadowTitle = "";
  @Prop() animation = { open: null, close: null };
  @Prop() closeOnOutsideClick = false;
  @Prop() visible = false;
  @State() extend = false;

  @Watch("visible")
  visiblePropWatcher() {
    if (this.visible) {
      this.showDarkShadow();
    } else {
      this.hideDarkShadow();
    }
  }

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

  @Method()
  async open() {
    this.showDarkShadow();
  }

  @Method()
  async close() {
    this.hideDarkShadow();
  }

  showDarkShadow = () => {
    this.extend = true;

    if (this.animation) {
      this.animation.open(this.el.shadowRoot.querySelector(".dark-shadow"));
    }

    if (this.closeOnOutsideClick) {
      document.addEventListener("keydown", this.handleKeyDown);
      this.el.addEventListener("click", this.hideDarkShadow);
      this.el.shadowRoot
        .querySelector(".dark-shadow")
        .addEventListener("click", stopClickPropagation);
    }
  };

  hideDarkShadow = () => {
    if (this.animation) {
      this.animation.close(
        this.el.shadowRoot.querySelector(".dark-shadow")
      ).onfinish = () => (this.extend = false);
    } else {
      this.extend = false;
    }

    if (this.closeOnOutsideClick) {
      document.removeEventListener("keydown", this.handleKeyDown);
      this.el.removeEventListener("click", this.hideDarkShadow);
      this.el.shadowRoot
        .querySelector(".dark-shadow")
        .addEventListener("click", stopClickPropagation);
    }
  };

  handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      this.close();
    }
  };

  animate(el: HTMLElement, mode: "open" | "close") {
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
    this.visiblePropWatcher();
  }

  render() {
    return (
      <div
        class={{
          "dark-shadow-container": true,
          "dark-outside": this.isDarkOutside
        }}
        style={{ display: this.extend ? "flex" : "none" }}
      >
        <div
          class={{ "dark-shadow": true, visible: this.extend }}
          style={{ width: this.width }}
        >
          {this.showHeader ? (
            <slot name="header">
              <div class="dark-shadow-header">
                {this.showCloseIcon ? (
                  <slot name="header-close-icon">
                    <i
                      class="one-for-all-icon close-icon"
                      onClick={this.close.bind(this)}
                    ></i>
                  </slot>
                ) : null}
                <h2 class="title">{this.shadowTitle || "Dark Shadow"}</h2>
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
                <button type="button" onClick={this.close.bind(this)}>
                  Ok
                </button>
                <button type="button" onClick={this.close.bind(this)}>
                  Cancel
                </button>
              </div>
            </slot>
          ) : null}
        </div>
      </div>
    );
  }
}
