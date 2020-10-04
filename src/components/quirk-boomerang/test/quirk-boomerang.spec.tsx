import { newSpecPage } from '@stencil/core/testing';
import { QuirkBoomerang } from '../quirk-boomerang';

describe('quirk-boomerang', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [QuirkBoomerang],
      html: `<quirk-boomerang></quirk-boomerang>`,
    });
    expect(page.root).toEqualHtml(`
      <quirk-boomerang>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </quirk-boomerang>
    `);
  });
});
