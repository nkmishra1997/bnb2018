import { ReverseArrPipe } from './reverse-arr.pipe';

describe('ReverseArrPipe', () => {
  it('create an instance', () => {
    const pipe = new ReverseArrPipe();
    expect(pipe).toBeTruthy();
  });
});
