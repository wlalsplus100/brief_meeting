import { keyboardInputDetector } from '../../utils/keyboardInputDetector';

describe('키보드인풋함수', () => {
  test('Enter가 눌렸다', () => {
    const eventMock = { key: 'Enter' } as KeyboardEvent;
    expect(keyboardInputDetector(eventMock)).toBe('Enter');
  });
});
