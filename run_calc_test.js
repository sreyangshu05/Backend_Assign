const { computeRateFromPA, computeAmountFromPR } = require('./lib/calc');

console.log('Test 1: Compute rate from P=5000, A=6050, n=2');
const res1 = computeRateFromPA(5000, 6050, 2);
console.log(JSON.stringify(res1, null, 2));

console.log('\nTest 2: Compute amount from P=5000, r=10, n=3');
const res2 = computeAmountFromPR(5000, 10, 3);
console.log(JSON.stringify(res2, null, 2));
