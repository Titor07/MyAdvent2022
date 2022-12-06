const fs = require('fs')
const ipt = fs.readFileSync("list1.txt", 'utf8').split('\n').map(String);

function isIncluded(line){
    [task1, task2] = line.split(",").map(String);
    [a,b] = task1.split("-").map(Number);
    [c,d] = task2.split("-").map(Number);
    if (a>=c && b<=d){
        return 1;
    }
    if (c>=a && d<=b){
        return 1;
    }
    return 0;
}

let sumTab = ipt.map(isIncluded).reduce((accumulator, currentValue) => accumulator + currentValue,0);
console.log(sumTab);

// part two

function secondIsIncluded(line){
    [task1, task2] = line.split(",").map(String);
    [a,b] = task1.split("-").map(Number);
    [c,d] = task2.split("-").map(Number);
    if (a>d){
        return 0;
    }
    if (c>b){
        return 0;
    }
    return 1;
}

let secondTabSum = ipt.map(secondIsIncluded).reduce((accumulator, currentValue) => accumulator + currentValue,0);
console.log(secondTabSum);