'use strict';
import DiceResult from './DiceResult';

export default class Dice {
    constructor(sides = 6, bonus = 0, count = 1) {
        this.sides = sides;
        this.count = count;
        this.bonus = bonus;
    }

    // expected format #d##[[+|-]bonus]
    static parse(dice) {
        const result = new Dice();
        // if we want multiple dice, like '1d6 + 2d4', then need +/- first, then split on 'd'

        if (dice && dice.length && dice.length > 0) {
            const parts = dice.split('d');
            if (parts && parts.length && parts.length > 1) {
                result.count = parseInt(parts[0]);

                const partString = String(parts[1]);
                if (partString.indexOf('+') >=0 || partString.indexOf('-') >=0) {
                    if (partString.length > 0) {
                        let bonusPart = partString.split('+');
                        if (bonusPart && bonusPart.length > 1) {
                            // found a plus
                            result.sides = parseInt(bonusPart[0]);
                            result.bonus = parseInt(bonusPart[1]);
                        } else {
                            bonusPart = partString.split('-');
                            if (bonusPart && bonusPart.length > 1) {
                                // found a minus
                                result.sides = parseInt(bonusPart[0]);
                                result.bonus = -parseInt(bonusPart[1]);
                            }
                        }
                    } // if (result.sides.length > 0) {
                    } else {
                    result.sides = parseInt(parts[1]);
                }
            } // if (parts && parts.length && parts.length > 1) {
        } // if (dice && dice.length && dice.length > 0) {

        return result;
    } //static parse(dice) {

    static roll(sides, count = 1) {
        const diceResult = new DiceResult(new Dice(sides, 0, count));
        if (sides > 0 && count > 0) {

            for (let i = 0; i < count; i++) {
                diceResult.rolls.push(parseInt(getRandomNumber(sides)));
            }
            diceResult.subTotal = parseInt(diceResult.rolls.reduce((acc, item) => acc += parseInt(item), 0));
            diceResult.total = parseInt(diceResult.subTotal);

            return diceResult;
        }
    } // roll() {

    static rollTotal(sides, bonus = 0, count = 1) {
        const diceResult = Dice.roll(sides, count);
        diceResult.bonus = parseInt(bonus);
        diceResult.dice.bonus = parseInt(bonus);
        diceResult.total += parseInt(bonus);
        return diceResult;
    } // rollTotal() {

    roll() {
        return Dice.roll(this.sides, this.count);
    }
    rollTotal() {
        return Dice.rollTotal(this.sides, this.bonus, this.count);
    }
} // export default class Dice {


// essentially private
function getRandomNumber(diceSides) {
    return Math.floor(Math.random() * Math.floor(diceSides)) + 1;
}
