'use strict';
import Dice from '../../Dice';

/*
*/
describe('Dice construction', function() {
    it('Initialize new Dice with d6 using defaults', function() {
        const newDice = new Dice(6);

        expect(6).to.equal(newDice.sides);
        expect(0).to.equal(newDice.bonus);
        expect(1).to.equal(newDice.count);
    });
    it('Initialize new Dice with d20', function() {
        const newDice = new Dice(20, -4, 8);

        expect(20).to.equal(newDice.sides);
        expect(-4).to.equal(newDice.bonus);
        expect(8).to.equal(newDice.count);
    });
    it('Initialize new Dice using all defaults', function() {
        const newDice = new Dice();

        expect(6).to.equal(newDice.sides);
        expect(0).to.equal(newDice.bonus);
        expect(1).to.equal(newDice.count);
    });
});

describe('Dice.parse', function() {
    it('Dice only', function() {
        const newDice = Dice.parse('1d6');

        expect(6).to.equal(newDice.sides);
        expect(0).to.equal(newDice.bonus);
        expect(1).to.equal(newDice.count);
    });
    it('Dice with positive bonus', function() {
        const newDice = Dice.parse('1d6+4');

        expect(6).to.equal(newDice.sides);
        expect(4).to.equal(newDice.bonus);
        expect(1).to.equal(newDice.count);
    });
    it('Dice with negative bonus', function() {
        const newDice = Dice.parse('5d6-2');

        expect(6).to.equal(newDice.sides);
        expect(-2).to.equal(newDice.bonus);
        expect(5).to.equal(newDice.count);
    });
    it('Dice with no bonus', function() {
        const newDice = Dice.parse('5d6+0');

        expect(6).to.equal(newDice.sides);
        expect(0).to.equal(newDice.bonus);
        expect(5).to.equal(newDice.count);
    });
    it('Dice with spaces', function() {
        const newDice = Dice.parse('5d10 + 4');

        expect(10).to.equal(newDice.sides);
        expect(4).to.equal(newDice.bonus);
        expect(5).to.equal(newDice.count);
    });
    it('Dice with more spaces', function() {
        const newDice = Dice.parse('5 d 8 + 4');

        expect(8).to.equal(newDice.sides);
        expect(4).to.equal(newDice.bonus);
        expect(5).to.equal(newDice.count);
    });

});

describe('Dice.roll instance method', function() {
    it('Dice.roll from dice with bonus', function() {
        const newDice = Dice.parse('1d20+4');
        const result = newDice.roll();

        expect(20).to.equal(result.dice.sides);
        expect(0).to.equal(result.dice.bonus);
        expect(0).to.equal(result.bonus);
        expect(1).to.equal(result.dice.count);
        expect(result.dice.count).to.equal(result.rolls.length);
        // because roll doesn't use bonus, these should always be equal
        expect(result.total).to.equal(result.subTotal);
        expect(true).to.equal(result.total > 0 && result.total <= (result.dice.sides * result.dice.count));
    });
    it('Dice.roll from dice with bonus', function() {
        const newDice = Dice.parse('5d20+4');
        const result = newDice.roll();

        expect(20).to.equal(result.dice.sides);
        expect(0).to.equal(result.bonus);
        expect(5).to.equal(result.dice.count);
        expect(result.dice.count).to.equal(result.rolls.length);
        // because roll doesn't use bonus, these should always be equal
        expect(result.total).to.equal(result.subTotal);
        expect(true).to.equal(result.total > 0 && result.total <= (result.dice.sides * result.dice.count));
    });
    it('Dice.roll from dice with bonus', function() {
        const newDice = Dice.parse('5d20');
        const result = newDice.roll();

        expect(20).to.equal(result.dice.sides);
        expect(0).to.equal(result.bonus);
        expect(5).to.equal(result.dice.count);
        expect(result.dice.count).to.equal(result.rolls.length);
        // because roll doesn't use bonus, these should always be equal
        expect(result.total).to.equal(result.subTotal);
        expect(true).to.equal(result.total > 0 && result.total <= (result.dice.sides * result.dice.count));
    });
});


describe('Dice.rollTotal instance method', function() {
    it('Dice.rollTotal from dice with bonus', function() {
        const newDice = Dice.parse('2d12+6');
        const result = newDice.rollTotal();

        expect(12).to.equal(result.dice.sides);
        expect(6).to.equal(result.bonus);
        expect(6).to.equal(result.dice.bonus);
        expect(2).to.equal(result.dice.count);
        expect(result.dice.count).to.equal(result.rolls.length);
        // because roll doesn't use bonus, these should always be equal
        expect(result.total).to.equal(result.subTotal + result.bonus);
        expect(true).to.equal(result.total > 0 && result.subTotal <= (result.dice.sides * result.dice.count));
    });
    it('Dice.rollTotal from dice with bonus', function() {
        const newDice = Dice.parse('5d4 + 4');
        const result = newDice.rollTotal();

        expect(4).to.equal(result.dice.sides);
        expect(4).to.equal(result.bonus);
        expect(4).to.equal(result.dice.bonus);
        expect(5).to.equal(result.dice.count);
        expect(result.dice.count).to.equal(result.rolls.length);
        // because roll doesn't use bonus, these should always be equal
        expect(result.total).to.equal(result.subTotal + result.bonus);
        expect(true).to.equal(result.total > 0 && result.subTotal <= (result.dice.sides * result.dice.count));
    });
    it('Dice.rollTotal from dice with no bonus', function() {
        const newDice = Dice.parse('5d20');
        const result = newDice.roll();

        expect(20).to.equal(result.dice.sides);
        expect(0).to.equal(result.bonus);
        expect(0).to.equal(result.dice.bonus);
        expect(5).to.equal(result.dice.count);
        expect(result.dice.count).to.equal(result.rolls.length);
        // because roll doesn't use bonus, these should always be equal
        expect(result.total).to.equal(result.subTotal + result.bonus);
        expect(true).to.equal(result.total > 0 && result.subTotal <= (result.dice.sides * result.dice.count));
    });
});