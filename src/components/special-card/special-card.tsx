import { Component, h, Prop, State, Element } from "@stencil/core";

@Component({
  tag: "special-card",
  styleUrl: "special-card.css",
})
export class SpecialCard {
  @Element() el: Element;
  @Prop() width = "auto";
  @Prop() cardTitle = "";
  @Prop() elevation = 2;
  @Prop() hoverElevation = 0;
  @Prop() showHeader = false;
  @Prop() borderRadius = "0.25rem";

  @State() isHover = false;

  get specialCardContainerEl() {
    return this.el.querySelector('.special-card-container');
  }

  componentDidLoad() {
    const containerEl = this.specialCardContainerEl;

    if (containerEl) {
      containerEl.addEventListener('mouseover', this.handleMouseOver.bind(this));
      containerEl.addEventListener('mouseout', this.handleMouseOut.bind(this));
    }
  }

  disconnectedCallback() {
    const containerEl = this.specialCardContainerEl;

    if (containerEl) {
      containerEl.removeEventListener('mouseover', this.handleMouseOver.bind(this));
      containerEl.removeEventListener('mouseout', this.handleMouseOut.bind(this));
    }
  }

  private handleMouseOver() {
    this.isHover = true;
  }

  private handleMouseOut() {
    this.isHover = false;
  }

  render() {
    return (
      <div
        class={`special-card-container elevation-${this.isHover && this.hoverElevation ? this.hoverElevation : this.elevation}`}
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
                "special-card-header--has-title": this.cardTitle?.length > 0,
              }}
            >
              <slot name="header-content">
                <h2 class="special-card-header__title">{this.cardTitle}</h2>
              </slot>
            </div>
          </slot>
          <slot name="body">
            <div class="special-card-body">
              <slot></slot>
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
