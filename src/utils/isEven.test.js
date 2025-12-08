import isEven from './isEven';

describe('isEven', () => {
    test('returns true if number is even', () => {
        expect(isEven(2)).toBe(true);
    });

    test('returns false if number is odd', () => {
        expect(isEven(3)).toBe(false);
    });

    test('throws error is the number is not a number', () => {
        expect(() => isEven('Hello world!')).toThrow(TypeError);
    });
});