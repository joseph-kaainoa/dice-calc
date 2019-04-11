'use strict';

export default class DiceResult {
    constructor() {
        this.total = 0;
        this.subTotal = 0;
        this.dice = {};
        this.rolls = [];
        this.bonus = 0;
    }
}