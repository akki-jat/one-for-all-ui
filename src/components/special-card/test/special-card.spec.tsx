import { newSpecPage } from '@stencil/core/testing';
import { SpecialCard } from '../special-card';

const getPage = async (html = '<special-card></special-card>') => newSpecPage({
  components: [SpecialCard],
  html,
})

describe('special-card', () => {
  it('renders', async () => {
    const page = await getPage();
    expect(page.body.querySelector('special-card')).toBeTruthy();
  });
});
