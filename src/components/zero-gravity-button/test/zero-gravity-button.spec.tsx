import { newSpecPage } from '@stencil/core/testing';
import { ZeroGravityButton } from '../zero-gravity-button';

describe('zero-gravity-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZeroGravityButton],
      html: `<zero-gravity-button></zero-gravity-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zero-gravity-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zero-gravity-button>
    `);
  });
});
