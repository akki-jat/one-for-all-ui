import {
  Component,
  h,
  Prop,
  Watch,
  Element,
  Method,
  Event,
  EventEmitter,
  State,
} from "@stencil/core";
import { revealY } from "../../utils/animations";
import { stopClickPropagation } from "../../utils/utils";

@Component({
  tag: "dark-shadow",
  styleUrl: "dark-shadow.css",
})
export class DarkShadow {
  @Element() el: HTMLElement;
  @Prop() isDarkOutside = true;
  @Prop() width = "auto";
  @Prop() showCloseIcon = true;
  @Prop() shadowTitle = "";
  @Prop() animation = { open: null, close: null };
  @Prop() closeOnOutsideClick = false;
  @Prop({ mutable: true, reflect: true }) visible = false;
  @State() extend = false;
  @Event() beforeShowCallback: EventEmitter;
  @Event() afterShowCallback: EventEmitter;
  @Event() beforeHideCallback: EventEmitter;
  @Event() afterHideCallback: EventEmitter;

  get darkShadowElement() {
    return this.el.querySelector(".dark-shadow");
  }

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
        this.darkShadowElement.addEventListener("click", stopClickPropagation);
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

  componentDidRender() {
    this.visible && this.showDarkShadow();
  }

  render() {
    return (
      <div
        class={{
          "dark-shadow-container": true,
          "dark-shadow-container--dark-outside": this.isDarkOutside,
          "dark-shadow-container--hidden": !this.extend,
        }}
      >
        <div
          class={{ "dark-shadow": true, "dark-shadow--visible": this.extend }}
          style={{ width: this.width }}
        >
          <slot name="header">
            <div
              class={{
                "dark-shadow-header": true,
                "dark-shadow-header--has-title":
                  this.showCloseIcon || this.shadowTitle?.length > 0,
              }}
            >
              {this.showCloseIcon ? (
                <slot name="header-close-icon">
                  <i
                    class="dark-shadow-header__close-icon"
                    onClick={this.close.bind(this)}
                  ></i>
                </slot>
              ) : null}
              <h2 class="dark-shadow-header__title">{this.shadowTitle}</h2>
            </div>
          </slot>
          <slot name="body">
            <div class="dark-shadow-body">
              <slot></slot>
            </div>
          </slot>
          <slot name="footer">
            <div class="dark-shadow-footer">
              <slot name="footer-content"></slot>
            </div>
          </slot>
        </div>
      </div>
    );
  }
}
