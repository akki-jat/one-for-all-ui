import { Component, h, Method, Prop, Element } from '@stencil/core';

@Component({
  tag: 'quirk-boomerang',
  styleUrl: 'quirk-boomerang.css',
  shadow: false,
})
export class QuirkBoomerang {
  @Element() el: HTMLElement;

  get quirkContainerEl() {
    return this.el.querySelector(".quirk-container") as HTMLDivElement;
  }

  get quirkEl() {
    return this.el.querySelector(".quirk-container > *") as HTMLElement;
  }

  @Method()
  async moveQuirk() {
    console.log("clg: ", this.el);
    (document.querySelector("#card-test") as HTMLDivElement)
      .scrollIntoView({ behavior: "smooth", inline: "end", block: "center" })
  }

  render() {
    return (
      <div class="quirk-boomerang-container">
        <div class="quirk-container">
          <slot></slot>
        </div>
        <slot name="left-button">
          <zero-gravity-button
            size="large"
            hover-elevation="6"
            variant="round"
            position="center-left"
            overlap
          >
            &lt;
          </zero-gravity-button>
        </slot>
        <slot name="right-button">
          <zero-gravity-button
            size="large"
            hover-elevation="6"
            variant="round"
            position="center-right"
            overlap
            onClick={this.moveQuirk}
          >
            &gt;
          </zero-gravity-button>
        </slot>
      </div>
    );
  }

}
