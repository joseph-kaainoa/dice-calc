'use strict';
import Dice from './Dice';

let myDice = new Dice(6);
console.log(myDice.sides);

let d20 = Dice.parse('2d20+2');
console.log('sides of dice: ' + d20.sides);
console.log('number of d20s: ' + d20.count);
console.log('bonus of d20s: ' + d20.bonus);