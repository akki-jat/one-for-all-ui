import { Component, h, Method, Prop, State, Element } from '@stencil/core';
import { isElementInViewport } from '../../utils/utils';

@Component({
  tag: 'quirk-boomerang',
  styleUrl: 'quirk-boomerang.css',
  shadow: false,
})
export class QuirkBoomerang {
  @Element() quirkEl: HTMLElement;
  @Prop() moveCount: number = 1;
  @Prop() totalElements: number = 0;
  @Prop() displayCount:
    | { small: string, medium: string, large: string }
    | string | number = { small: "1", medium: "2", large: "4" };

  @State() lastMovedElement: Element;
  scrollTimeout: number;

  get quirkContainerEl() {
    return this.quirkEl.querySelector("quirk-boomerang .quirk-container");
  }

  get visibleQuirks() {
    return this.quirkContainerEl.querySelectorAll(".quirk-visible");
  }

  get quirkCount() {
    let count = 1;

    try {
      if (typeof this.displayCount === "object") {
        return this.displayCount;
      }

      if (isNaN(this.displayCount as number)) {
        return JSON.parse(this.displayCount as string);
      } else {
        count = +this.displayCount;
      }
    } catch (error) {
      console.warn("Set proper value for displayCount prop. Error: ", error)
    }

    return { small: count, medium: count, large: count };
  }

  get elementCount() {
    return (this.totalElements || document.querySelectorAll("quirk-boomerang .quirk-container > [quirk-index]").length);
  }

  @Method()
  async moveQuirk() {
    if (this.visibleQuirks && this.visibleQuirks.length) {
      const currentEndIndex = +this.visibleQuirks[this.visibleQuirks.length - 1].getAttribute("quirk-index");
      const moveToIndex = currentEndIndex + this.moveCount;
      let moveEl = this.quirkContainerEl.querySelector(`[quirk-index="${moveToIndex}"]`) || this.quirkContainerEl.lastElementChild;

      if (this.lastMovedElement === moveEl) {
        moveEl = this.quirkContainerEl.querySelector(`[quirk-index="${moveToIndex + this.moveCount}"]`) || this.quirkContainerEl.lastElementChild;
      }

      if (moveEl) {
        this.lastMovedElement = moveEl;
        moveEl.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
      }
    }
  }

  setVisibleQuirks() {
    let index = this.visibleQuirks && this.visibleQuirks.length ? +this.visibleQuirks[0].getAttribute("quirk-index") : 0;
    this.quirkContainerEl.querySelectorAll("[quirk-index]").forEach(quirk => quirk.classList.remove("quirk-visible"));
    let visibleQuirkClassSetFailCount = 0;

    while (true) {
      const el = this.quirkContainerEl.querySelector(`[quirk-index="${index}"]`);

      if (el && isElementInViewport(el)) {
        el.classList.add("quirk-visible");
      } else {
        visibleQuirkClassSetFailCount++;
      }

      index++;

      if (visibleQuirkClassSetFailCount > this.elementCount) {
        break;
      }
    }
  }

  scrollEventCallback(_e: Event) {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = window.setTimeout(() => {
      this.setVisibleQuirks();
    }, 0);
  }

  componentDidLoad() {
    this.setVisibleQuirks();
  }

  componentDidRender() {
    this.quirkContainerEl.addEventListener('scroll', this.scrollEventCallback.bind(this));
  }

  disconnectedCallback() {
    this.quirkContainerEl.removeEventListener("scroll", this.scrollEventCallback.bind(this));
  }

  render() {
    return (
      <div class="quirk-boomerang-container">
        <div class="quirk-container" style={{ "--quirk-small-count": this.quirkCount.small, "--quirk-medium-count": this.quirkCount.medium, "--quirk-large-count": this.quirkCount.large }}>
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
            onClick={this.moveQuirk.bind(this)}
          >
            &gt;
          </zero-gravity-button>
        </slot>
      </div>
    );
  }
}
