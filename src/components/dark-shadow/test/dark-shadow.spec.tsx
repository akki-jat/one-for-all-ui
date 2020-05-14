import { newSpecPage } from '@stencil/core/testing';
import { DarkShadow } from '../dark-shadow';

const getPage = async (html = '<dark-shadow></dark-shadow>') => newSpecPage({
  components: [DarkShadow],
  html,
})

describe('dark-shadow', () => {
  it('builds', async () => {
    const page = await getPage();
    expect(page.body.querySelector('dark-shadow')).toBeTruthy();
  });

  describe('dark-outside', () => {
    it('isDarkOutside should be true by default', async () => {
      const page = await getPage();
      expect(page.body.querySelector('dark-shadow').isDarkOutside).toBeTruthy();
    })
  })
});
