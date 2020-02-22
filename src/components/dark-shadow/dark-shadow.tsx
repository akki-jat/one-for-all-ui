import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "dark-shadow",
  styleUrl: "dark-shadow.css",
  shadow: true
})
export class DarkShadow {
  @Prop() isDarkOutside = true;
  @Prop() width = "auto";
  @Prop() showCloseIcon = true;
  @Prop() showHeader = true;
  @Prop() showFooter = true;
  @Prop() title = "";

  render() {
    return (
      <div
        class={{
          "dark-shadow-container": true,
          "dark-outside": this.isDarkOutside
        }}
      >
        <div class="dark-shadow" style={{ width: this.width }}>
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
              This Quirk allows the user to host a shadow-like monster inside
              their body. <br /> Dark Shadow has been known to be able to speak
              and think as it's own being. Dark Shadow can be strengthen by
              negative emotions and the darker a place is, but it also gets
              harder to control. <br /> Users: Fumikage Tokoyami
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
