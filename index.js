'use strict';
import Dice from './Dice';

let myDice = new Dice(6);
console.log(myDice.sides);
let rollResult = 0;
let diceString = '2d20+2';

console.log('Given: ' + diceString);
myDice = Dice.parse(diceString);
console.log('\tsides of dice: ' + myDice.sides);
console.log('\tnumber of d20s: ' + myDice.count);
console.log('\tbonus of d20s: ' + myDice.bonus);
rollResult = myDice.rollTotal();
console.log(`\troll: ${rollResult.subTotal} + ${rollResult.bonus} = ${(parseInt(rollResult.subTotal) + parseInt(rollResult.bonus))}`);
console.log(`\trolls (${rollResult.rolls.join(' + ')}) + ${rollResult.bonus} = ${rollResult.total}`);

diceString = '6d6-5';
console.log('Given: ' + diceString);
myDice = Dice.parse(diceString);
console.log('\tsides of dice: ' + myDice.sides);
console.log('\tnumber of d20s: ' + myDice.count);
console.log('\tbonus of d20s: ' + myDice.bonus);
rollResult = myDice.roll(); // doesn't add the bonus automatically
console.log(`\troll: ${rollResult.subTotal} + ${myDice.bonus} = ${(parseInt(rollResult.subTotal) + parseInt(myDice.bonus))}`);
console.log(`\trolls (${rollResult.rolls.join(' + ')}) + ${myDice.bonus} = ${(parseInt(rollResult.subTotal) + parseInt(myDice.bonus))}`);
