import { HashMap } from './hashMap.js';

const test = new HashMap() 

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.buckets);
console.log(test.size);
console.log(test.capacity);
console.log(test.loadFactor);


test.set('moon', 'silver')
console.log(test.buckets);
console.log(test.size);
console.log(test.capacity);
console.log(test.loadFactor);

console.log("Entries ", test.entries())
console.log("Keys ", test.keys())
console.log("Values ", test.values())
console.log(test.get('kite'))
console.log("Length ", test.length())
// console.log(test.entries())
