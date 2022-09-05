import { KelvinToFahrenheitPipe } from './kelvin-to-fahrenheit.pipe';

describe('KelvinToFahrenheitPipe', () => {
  it('create an instance', () => {
    const pipe = new KelvinToFahrenheitPipe();
    expect(pipe).toBeTruthy();
  });
});
