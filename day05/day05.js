const fs = require('fs')
const ipt = fs.readFileSync("list.txt", 'utf8').split('\n\n').map(String);

const firstBlock = ipt[0].split("\n").map(String);

//find number of colomns
lastLine = firstBlock[firstBlock.length-1].split("\n").map(String);
sizeLine = lastLine[0].length;
nbCol = lastLine[0].split("")[sizeLine-2];
nbLine = firstBlock.length -1;


// Construction of col
let tab = [];
for (let i=0; i<nbCol; i++){
    tab.push([]);
}

for (let i=0; i<nbLine;i++){
    for (let j=0; j<nbCol; j++){
        index = j*4+1;
        if (firstBlock[i][index] != " "){
            tab[j].push(firstBlock[i][index]);
        }
    }
}

for (let i=0; i<nbCol; i++){
    tab[i].reverse();
}
console.log(tab);
// for part two
let secondTab = JSON.parse(JSON.stringify(tab))
console.log(secondTab);
// construction of instructions

function insFunc(line){
    splittedLine = line.split(" ");
    move = splittedLine[1];
    from = splittedLine[3];
    to = splittedLine[5];
    return [move, from, to].map(Number);
}
secondBlock = ipt[1].split("\n").map(String);
let instructions = secondBlock.map(insFunc);

// treatment part one and two
for(let i=0; i<instructions.length; i++){
    let tabToAdd = [];
    for(let j=0; j<instructions[i][0]; j++){
        let toChange = tab[instructions[i][1]-1].pop();
        let secondChange = secondTab[instructions[i][1]-1].pop();
        let toInsert = String(toChange);
        let secondInsert = String(secondChange);
        tab[instructions[i][2]-1].push(toInsert);
        tabToAdd.push(secondInsert);
    }
    tabToAdd.reverse();
    secondTab[instructions[i][2]-1]= secondTab[instructions[i][2]-1].concat(tabToAdd);
    console.log(tabToAdd);
}
// finding tops string
console.log(tab.reduce((accumulator, currentValue) => accumulator + currentValue[currentValue.length-1],""))
console.log(secondTab.reduce((accumulator, currentValue) => accumulator + currentValue[currentValue.length-1],""))