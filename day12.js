const fs = require('fs');
const path = require('path');
const ipt = fs.readFileSync("list.txt", 'utf8').split('\n').map(String);


function start(element){
    if (element == "S"){
        return 0;
    }
    return Infinity;
}

function initialize(line){
    parseLine = line.split("");
    newLine = parseLine.map(start)
    return newLine;
}


let pathWeight = ipt.map(initialize);
let remaining = []
for (let i=0; i<ipt.length;i++){
    for (let j=0; j<ipt[0].length;j++){
        remaining.push([i,j])
    }
}
remaining.shift()

currentNode = [0,0];

function score([i,j]){
    if (ipt[i][j] == "E"){
        return 0;
    }
    if (ipt[i][j] == "S"){
        return Infinity;
    }
    return ipt[i][j].charCodeAt(0);
}

function canMoveUp([i,j]){
    if (i>0){
        if (score([i-1,j]) <= 1 + score([i,j])){
            return true;
        }
    }
    return 
}

function canMoveDown([i,j]){
    if (i<ipt.length-1){
        if (score([i+1,j]) <= 1 + score([i,j])){
            return true
        }
    }
    return false
}

function canMoveLeft([i,j]){
    if (j>0){
        if (score([i,j-1]) <= 1 + score([i,j])){
            return true
        }
    }
    return false
}

function canMoveRight([i,j]){
    if (j<ipt[0].length-1){
        if (score([i,j+1]) <= 1 + score([i,j])){
            return true
        }
    }
    return false
}

function findNeighboors([i,j]){
    let list = [];
    if (canMoveDown([i,j])){
        list.push([i+1,j])
    }
    if (canMoveUp([i,j])){
        list.push([i-1,j])
    }
    if (canMoveLeft([i,j])){
        list.push([i,j-1])
    }
    if (canMoveRight([i,j])){
        list.push([i,j+1])
    }
    return list
}

function findShortest(){
    let line = remaining[0][0];
    let column = remaining[0][1];
    let shortest = pathWeight[line][column]
    let index = 0
    for (let i=1; i<remaining.length;i++){
        if (pathWeight[remaining[i][0]][remaining[i][1]] <= shortest){
            shortest = remaining[i]
            line = remaining[i][0]
            column = remaining[i][1]
            index = i
        }
    }
    return [line, column]
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

while (remaining.length != 1){
    // Find neighboors amoung remaining
    let neighboors = findNeighboors(currentNode);
    // update pathWeight
    let i = currentNode[0]
    let j = currentNode[1]
    for (let k=0;k<neighboors.length;k++){
        pathWeight[neighboors[k][0]][neighboors[k][1]] = pathWeight[i][j]+1
    }
    let newRemaining = []
    for (let k=0;k<remaining.length;k++){
        if (remaining[k][0] != i || remaining[k][1] != j)
            newRemaining.push(remaining[k])
    }
    remaining = newRemaining
    console.log("current node "+ currentNode +" Neighboors "+neighboors)
    // update current node
    currentNode = findShortest()
}
