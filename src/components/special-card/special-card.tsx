import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "special-card",
  styleUrl: "special-card.css",
  shadow: true,
})
export class SpecialCard {
  @Prop() width = "auto";
  @Prop() cardTitle = "";
  @Prop() showHeader = false;
  @Prop() borderRadius = "0.25rem";

  render() {
    return (
      <div
        class="special-card-container"
        style={{
          width: this.width,
          borderRadius: this.borderRadius,
        }}
      >
        <div class="special-card">
          <slot name="header">
            <div
              class={{
                "special-card-header": true,
                "has-title": this.cardTitle?.length > 0,
              }}
            >
              <slot name="header-content">
                <h2 class="title">{this.cardTitle}</h2>
              </slot>
            </div>
          </slot>
          <slot name="body">
            <div class="special-card-body">
              <slot>Card Body</slot>
            </div>
          </slot>
          <slot name="footer">
            <div class="special-card-footer">
              <slot name="footer-content"></slot>
            </div>
          </slot>
        </div>
      </div>
    );
  }
}
