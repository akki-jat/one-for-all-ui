import { newSpecPage } from '@stencil/core/testing';
import { ZeroGravityButton } from '../zero-gravity-button';

describe('zero-gravity-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZeroGravityButton],
      html: `<zero-gravity-button></zero-gravity-button>`,
    });

    expect(page.body.querySelector('zero-gravity-button')).toBeTruthy();
  });
});
