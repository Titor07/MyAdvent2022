const fs = require('fs')
const ipt = fs.readFileSync("list1.txt", 'utf8').split('\n').map(String);

function score(line){
    let size = line.length;
    let splitedLine = line.split(" ")[0]
    firstCompartment = splitedLine.slice(0,size/2);
    secondCompartment = splitedLine.slice(size/2,size);
    letter = firstCompartment[0];
    for (let i=0; i<size/2; i++){
        for (let j=0; j<size/2; j++)
            if (firstCompartment[i] == secondCompartment[j]){
                letter = firstCompartment[i]
            }
    }
    return nbPoint(letter);
}

function nbPoint(letter){
    if (letter.charCodeAt(0) < 97){
        return letter.charCodeAt(0)-38;
    }
    return letter.charCodeAt() - 96;
}
const sumTab = ipt.map(score).reduce((accumulator, currentValue) => accumulator + currentValue,0);
console.log(sumTab);

