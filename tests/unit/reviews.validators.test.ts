import { normalizeRating, normalizeText } from '../../src/modules/reviews/reviews.validators';

describe('Reviews validators (UNIT)', () => {
    describe('normalizeRating', () => {
        it('should accept rating 1..10', () => {
            expect(normalizeRating(1)).toBe(1);
            expect(normalizeRating(10)).toBe(10);
            expect(normalizeRating('7')).toBe(7);
        });

        it('should throw on NaN', () => {
            expect(() => normalizeRating('abc')).toThrow();
        });

        it('should throw on out of range', () => {
            expect(() => normalizeRating(0)).toThrow();
            expect(() => normalizeRating(11)).toThrow();
        });
    });

    describe('normalizeText', () => {
        it('should trim text', () => {
            expect(normalizeText('  hello  ')).toBe('hello');
        });

        it('should throw on empty', () => {
            expect(() => normalizeText('   ')).toThrow();
            expect(() => normalizeText(null)).toThrow();
        });
    });
});
