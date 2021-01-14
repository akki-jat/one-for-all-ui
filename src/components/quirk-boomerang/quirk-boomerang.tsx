import { Component, h, Method, Prop, State, Element } from '@stencil/core';
import { isElementVisibleInViewportAndParent } from '../../utils/utils';

@Component({
  tag: 'quirk-boomerang',
  styleUrl: 'quirk-boomerang.css',
})
export class QuirkBoomerang {
  @Element() quirkEl: HTMLElement;
  @Prop() moveCount: number = 1;
  @Prop() totalElements: number = 0;
  @Prop() displayCount:
    | { small: string, medium: string, large: string }
    | string | number = { small: "1", medium: "2", large: "4" };

  @State() lastMovedElement: Element;
  @State() moveDirection: "forward" | "backward";
  @State() visibleMoveButton = { forward: true, backward: false };
  scrollTimeoutId: number;

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

  get lastMovedElementIndex() {
    return this.lastMovedElement ? +this.lastMovedElement.getAttribute("quirk-index") : -1;
  }

  @Method()
  async moveQuirk(isMoveForward: boolean | undefined, moveElementIndex: number | undefined = undefined) {
    if (moveElementIndex) {
      this.moveDirection = moveElementIndex >= this.lastMovedElementIndex ? "forward" : "backward";
      isMoveForward = this.moveDirection === "forward";
    }

    // if (this.visibleQuirks && this.visibleQuirks.length && (!moveElementIndex || (moveElementIndex && moveElementIndex !== this.lastMovedElementIndex))) {
    if (this.visibleQuirks && this.visibleQuirks.length) {
      const currentEndIndex = +this.visibleQuirks[this.visibleQuirks.length - 1].getAttribute("quirk-index");
      const moveToIndex = moveElementIndex != null ? moveElementIndex
        : isMoveForward ? currentEndIndex + this.moveCount : currentEndIndex - this.moveCount;
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
    let visibleQuirkClassSetFailCount = 0;
    const isFirstRender = this.lastMovedElement == null;
    const lastMoveElementIndex = isFirstRender ? 0 : +this.lastMovedElement.getAttribute("quirk-index");
    const isVisibleQuirksAvailable = this.visibleQuirks && this.visibleQuirks.length;
    const isMoveForward = this.moveDirection == null || this.moveDirection === "forward";
    const firstVisibleQuirkIndex = isFirstRender ? 0 : isVisibleQuirksAvailable
      ? +this.visibleQuirks[0].getAttribute("quirk-index")
      : lastMoveElementIndex;
    const lastVisibleQuirkIndex = isFirstRender ? this.moveCount : isVisibleQuirksAvailable
      ? +this.visibleQuirks[this.visibleQuirks.length - 1].getAttribute("quirk-index")
      : lastMoveElementIndex;
    let index = isMoveForward ? firstVisibleQuirkIndex : lastVisibleQuirkIndex;
    this.quirkContainerEl.querySelectorAll("[quirk-index]").forEach(quirk => quirk.classList.remove("quirk-visible"));

    while (true) {
      const el = this.quirkContainerEl.querySelector(`[quirk-index="${index}"]`);

      if (el && isElementVisibleInViewportAndParent(el)) {
        el.classList.add("quirk-visible");
      } else {
        visibleQuirkClassSetFailCount++;
      }

      if (isMoveForward) {
        index++;
      } else {
        index--;
      }

      if (visibleQuirkClassSetFailCount > this.elementCount) {
        break;
      }
    }

    this.setMoveButtonVisibility(
      isMoveForward ? firstVisibleQuirkIndex : firstVisibleQuirkIndex - this.moveCount,
      isMoveForward ? lastVisibleQuirkIndex + this.moveCount : lastVisibleQuirkIndex,
      isFirstRender
    );
  }

  setMoveButtonVisibility(firstVisibleQuirkIndex: number, lastVisibleQuirkIndex: number, isFirstRender: boolean) {
    if (!isFirstRender) {
      this.visibleMoveButton = {
        ...this.visibleMoveButton,
        forward: lastVisibleQuirkIndex < this.elementCount - 1,
        backward: firstVisibleQuirkIndex > 0
      }
    }
  }

  keyPressHandler(event: KeyboardEvent) {
    if (event.key === "Tab" && document.activeElement && document.activeElement.getAttribute("quirk-index")) {
      let moveElementIndex = +document.activeElement.getAttribute("quirk-index");
      // here added 1 to make sure next element to focus is in view
      this.moveQuirk(undefined, moveElementIndex + 1);
    }
  }
  scrollEventCallback(_e: Event) {
    if (this.scrollTimeoutId != null) {
      clearTimeout(this.scrollTimeoutId);
    }

    this.scrollTimeoutId = window.setTimeout(() => {
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
        <div class="move-btns" tabIndex={-1}>
          <slot name="left-button">
            <div class="move-btn-wrapper backward-move-btn-wrapper">
              <button
                class="move-btn backward-move backward-move-btn"
                disabled={!this.visibleMoveButton.backward}
                  onClick={this.moveQuirk.bind(this, false, undefined)}
            >
              &lt;
            </button>
            </div>
          </slot>
          <slot name="right-button">
            <div class="move-btn-wrapper forward-move-btn-wrapper">
              <button
                class="move-btn forward-move forward-move-btn"
                disabled={!this.visibleMoveButton.forward}
                  onClick={this.moveQuirk.bind(this, true, undefined)}
            >
              &gt;
            </button>
            </div>
          </slot>
        </div>
        <div class="quirk-container" onKeyUp={this.keyPressHandler.bind(this)} style={{ "--quirk-small-count": this.quirkCount.small, "--quirk-medium-count": this.quirkCount.medium, "--quirk-large-count": this.quirkCount.large }}>
          <slot></slot>
        </div>
      </div>
    );
  }
}
