'use strict';

export default class Dice {
    constructor(sides) {
        this.sides = sides;
        this.count = 1;
        this.bonus = 0;
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
                            result.bonus = bonusPart[1];
                        }
                    }
                }
            }
        }

        return result;
    }
}