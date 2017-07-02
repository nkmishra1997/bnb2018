import { BnbPage } from './app.po';

describe('bnb App', () => {
  let page: BnbPage;

  beforeEach(() => {
    page = new BnbPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
