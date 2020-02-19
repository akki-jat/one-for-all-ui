import { newE2EPage } from '@stencil/core/testing';

describe('dark-shadow', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dark-shadow></dark-shadow>');

    const element = await page.find('dark-shadow');
    expect(element).toHaveClass('hydrated');
  });
});
