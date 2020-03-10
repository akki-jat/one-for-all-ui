import {
  Component,
  h,
  Prop,
  Watch,
  Element,
  Method,
  Event,
  EventEmitter,
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
  @Prop({ mutable: true, reflect: true }) visible = false;
  @State() extend = false;
  @Event() beforeShowCallback: EventEmitter;
  @Event() afterShowCallback: EventEmitter;
  @Event() beforeHideCallback: EventEmitter;
  @Event() afterHideCallback: EventEmitter;

  @Watch("visible")
  visiblePropWatcher() {
    if (this.visible) {
      this.showDarkShadow();
    } else {
      this.hideDarkShadow();
    }
  }

  @Method()
  async open() {
    this.visible = true;
  }

  @Method()
  async close() {
    this.visible = false;
  }

  get darkShadowElement() {
    return this.el.shadowRoot.querySelector(".dark-shadow");
  }

  showDarkShadow = () => {
    const { returnValue } = this.beforeShowCallback.emit(this.el);
    if (returnValue) {
      this.extend = true;

      if (this.animation) {
        this.animation.open?.(this.darkShadowElement) ??
          revealY.show(this.darkShadowElement);
      }

      if (this.closeOnOutsideClick) {
        document.addEventListener("keydown", this.handleKeyDown);
        this.el.addEventListener("click", this.handleOutsideClick);
        this.darkShadowElement?.addEventListener("click", stopClickPropagation);
      }
      this.afterShowCallback.emit(this.el);
    }
  };

  hideDarkShadow = () => {
    const { returnValue } = this.beforeHideCallback.emit(this.el);
    if (returnValue) {
      if (this.animation) {
        this.animation.close?.(this.darkShadowElement) ??
          (revealY.hide(this.darkShadowElement).onfinish = () => {
            this.extend = false;
            this.afterHideCallback.emit(this.el);
          });
      } else {
        this.extend = false;
        this.afterHideCallback.emit(this.el);
      }

      if (this.closeOnOutsideClick) {
        document.removeEventListener("keydown", this.handleKeyDown);
        this.el.removeEventListener("click", this.handleOutsideClick);
        this.darkShadowElement.addEventListener("click", stopClickPropagation);
      }
    }
  };

  handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      this.close();
    }
  };

  handleOutsideClick = () => {
    this.close();
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

  componentWillLoad() {
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
