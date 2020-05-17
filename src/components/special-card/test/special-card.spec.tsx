import { newSpecPage } from '@stencil/core/testing';
import { SpecialCard } from '../special-card';

describe('special-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpecialCard],
      html: `<special-card></special-card>`,
    });
    expect(page.root).toEqualHtml(`
      <special-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </special-card>
    `);
  });
});
