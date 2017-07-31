import { PmtNgPage } from './app.po';

describe('pmt-ng App', () => {
  let page: PmtNgPage;

  beforeEach(() => {
    page = new PmtNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
