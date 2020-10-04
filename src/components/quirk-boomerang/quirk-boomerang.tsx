import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'quirk-boomerang',
  styleUrl: 'quirk-boomerang.css',
  shadow: true,
})
export class QuirkBoomerang {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
