'use strict';

export default class DiceResult {
    constructor(dice) {
        this.total = 0;
        this.subTotal = 0;
        this.dice = dice;
        this.rolls = [];
        this.bonus = 0;
    }
}