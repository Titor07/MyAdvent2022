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

// part two
function secondScore(line1,line2,line3){
    let size1 = line1.length;
    let size2 = line2.length;
    let size3 = line3.length
    letter = line1[0];
    for (let i=0; i<size1; i++){
        for (let j=0; j<size2; j++){
            for (let k=0; k<size3; k++){
                if (line1[i] == line2[j] && line1[i] == line3[k]){
                    letter = line1[i];
                }
            }
        }
    }
    return nbPoint(letter);
}

function splittedLines (line1, line2, line3) {
    let splittedLine1 = line1.split('');
    let splittedLine2 = line2.split('');
    let splittedLine3 = line3.split('');
  
    return secondScore(splittedLine1,splittedLine2,splittedLine3);
}

let scoreTab = []
for (let i=0; i<ipt.length; i=i+3){
    let sc = secondScore(ipt[i], ipt[i+1], ipt[i+2]);
    scoreTab.push(sc)
}
const SecondTabSum = scoreTab.reduce((accumulator, currentValue) => accumulator + currentValue,0)
console.log(SecondTabSum);

