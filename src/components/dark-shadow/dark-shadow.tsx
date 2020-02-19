import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'dark-shadow',
  styleUrl: 'dark-shadow.css',
  shadow: true
})
export class DarkShadow {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
