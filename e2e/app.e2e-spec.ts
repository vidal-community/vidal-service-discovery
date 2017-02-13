import { ServiceDicoveryPage } from './app.po';

describe('service-dicovery App', function() {
  let page: ServiceDicoveryPage;

  beforeEach(() => {
    page = new ServiceDicoveryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
