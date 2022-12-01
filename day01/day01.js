const fs = require('fs')
const ipt = fs.readFileSync("list1.txt", 'utf8').split('\n\n').map(String);

function Sum(tab){
    splittedTab = tab.split('\n').map(Number);
    const initialValue = 0;
    let sumWithInitial = splittedTab.reduce((accumulator, currentValue) => accumulator + currentValue,initialValue);
    return sumWithInitial;
}

const tabSum = ipt.map(Sum)
firstMax = Math.max(...tabSum);

// ex2

const secTabSum = tabSum.filter(el => el != firstMax);
secondMax = Math.max(...secTabSum);

const thirdTabSum = secTabSum.filter(el => el != secondMax);
thirdMax = Math.max(... thirdTabSum);

total = firstMax + secondMax + thirdMax;
console.log(total);