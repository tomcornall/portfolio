import { HoverClassDirective } from './hover-class.directive';

describe('HoverClassDirective', () => {
  it('should create an instance', () => {
    let elRefMock = {
      nativeElement: document.createElement('div')
    };

    const directive = new HoverClassDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
