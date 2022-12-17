import { Content } from '../content';

describe('Content', () => {
  it('it should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('it should not be able to create a notification content with less than 5 charecters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  it('it should not be able to create a notification content with more than 5 charecters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
