'use strict';
import DiceResult from './DiceResult';

export default class Dice {
    constructor(sides, bonus = 0, count = 1) {
        this.sides = sides;
        this.count = count;
        this.bonus = bonus;
    }

    // expected format #d##[[+|-]bonus]
    static parse(dice) {
        const result = new Dice(8);

        if (dice && dice.length && dice.length > 0) {
            const parts = dice.split('d');
            if (parts && parts.length && parts.length > 1) {
                result.count = parts[0];
                result.sides = parts[1];
                if (result.sides.length > 0) {
                    let bonusPart = result.sides.split('+');
                    if (bonusPart && bonusPart.length > 1) {
                        // found a plus
                        result.sides = bonusPart[0];
                        result.bonus = bonusPart[1];
                    } else {
                        bonusPart = result.sides.split('-');
                        if (bonusPart && bonusPart.length > 1) {
                            // found a minus
                            result.sides = bonusPart[0];
                            result.bonus = -bonusPart[1];
                        }
                    }
                } // if (result.sides.length > 0) {
            } // if (parts && parts.length && parts.length > 1) {
        } // if (dice && dice.length && dice.length > 0) {

        return result;
    } //static parse(dice) {

    static roll(sides, count = 1) {
        const diceResult = new DiceResult(new Dice(sides, 0, count));
        if (sides > 0 && count > 0) {
            let result = 0;
            for (let i = 0; i < count; i++) {
                result += parseInt(getRandomNumber(sides));
                diceResult.rolls.push(result);
            }
            diceResult.subTotal = parseInt(diceResult.rolls.reduce((acc, item) => acc += parseInt(item), 0));
            diceResult.total = parseInt(diceResult.subTotal);

            return diceResult; //result;
        }
    } // roll() {

    static rollTotal(sides, bonus = 0, count = 1) {
        const diceResult = Dice.roll(sides, count);
        diceResult.bonus = bonus;
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
