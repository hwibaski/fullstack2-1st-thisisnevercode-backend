import { checkStringValid } from './checkStringValid';

describe('checkStringValid', () => {
  test('checkStringValid input : null', () => {
    expect(checkStringValid(null)).toEqual(false);
  });

  test('checkStringValid input : null', () => {
    expect(checkStringValid(undefined)).toEqual(false);
  });

  test('checkStringValid input : error', () => {
    // You can also use the exact error message or a regexp

    expect(() => checkStringValid('error')).toThrow(Error);

    expect(() => checkStringValid('error')).toThrow(
      'you are using the wrong JDK'
    );

    expect(() => checkStringValid('error')).toThrow(/JDK/);
  });
});

// 직접함수를 실행시키면에러로 판단
