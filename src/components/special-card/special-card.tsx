import { Component, h, Prop, State, Element } from "@stencil/core";
import { HoverEvent } from "../../utils/events/hover";

@Component({
  tag: "special-card",
  styleUrl: "special-card.css",
})
export class SpecialCard {
  @Element() el: Element;
  @Prop() width = "auto";
  @Prop() height = "auto";
  @Prop() cardTitle = "";
  @Prop() cardSubtitle = "";
  @Prop() elevation = 2;
  @Prop() hoverElevation = 0;
  @Prop() showHeader = false;
  @Prop() borderRadius = "0.25rem";

  @State() isHover = false;

  private hoverEvent = new HoverEvent((isHover: boolean) => { this.isHover = isHover });

  get specialCardContainerEl() {
    return this.el.querySelector('.special-card-container');
  }

  componentDidLoad() {
    this.hoverEvent.observe(this.specialCardContainerEl);
  }

  disconnectedCallback() {
    this.hoverEvent.stop(this.specialCardContainerEl);
  }

  render() {
    return (
      <div
        class={`special-card-container one-for-all-elevation-${this.isHover && this.hoverElevation ? this.hoverElevation : this.elevation}`}
        style={{
          width: this.width,
          height: this.height,
          borderRadius: this.borderRadius,
        }}
      >
        <div class="special-card">
          <slot name="header">
            <div
              class={{
                "special-card-header": true,
                "special-card-header--has-title": this.cardTitle?.length > 0,
                "special-card-header--has-subtitle": this.cardSubtitle?.length > 0
              }}
            >
              <slot name="header-content">
                <h2 class="special-card-header__title">{this.cardTitle}</h2>
                <div class="special-card-header__subtitle">{this.cardSubtitle}</div>
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
