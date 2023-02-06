// Get input
const fs = require('fs')
const ipt = fs.readFileSync("list.txt", 'utf8').split('\n').map(String);

// get Head moves

function moveFunction(accumulateur, valeurCourante, index, array){
    let line = valeurCourante.split(" ");
    
    if (line[0] == "R"){
        for(let i=0; i<Number(line[1]);i++){
            let lastPos = accumulateur[accumulateur.length -1];
            accumulateur.push([lastPos[0]+1,lastPos[1]]);
        }
    }
    if (line[0] == "L"){
        for(let i=0; i<Number(line[1]);i++){
            let lastPos = accumulateur[accumulateur.length -1];
            accumulateur.push([lastPos[0]-1,lastPos[1]]);
        }
    }
    if (line[0] == "U"){
        for(let i=0;i<Number(line[1]);i++){
            let lastPos = accumulateur[accumulateur.length -1];
            accumulateur.push([lastPos[0],lastPos[1]+1]);
        }
    }
    if (line[0] == "D"){
        for(let i=0;i<Number(line[1]);i++){
            let lastPos = accumulateur[accumulateur.length -1];
            accumulateur.push([lastPos[0],lastPos[1]-1]);
        }
    }
    return accumulateur;
}
let initPos = [[0,0]]
let headMoves = ipt.reduce(moveFunction, initPos);

// Get Tail moves
initPos =  [[0,0]]
function followFunction(accumulateur, valeurCourante, index, array){
    let a = Math.pow(accumulateur[accumulateur.length-1][0] - valeurCourante[0],2);
    let b = Math.pow(accumulateur[accumulateur.length-1][1] - valeurCourante[1],2);
    let dist = Math.pow(a+b,0.5);
    if (dist>=2){
        accumulateur.push(array[index-1]);
    }
    else{
        accumulateur.push(accumulateur[accumulateur.length-1])
    }
    return accumulateur;
}


let tailMoves = headMoves.reduce(followFunction,initPos)
for (let i=0; i<9;i++){
    newTail = tailMoves.reduce(followFunction,[[0,0]])
    tailMoves = newTail;
}


// Get different Tail Pos
function tabIsIn(tab1,tab2){
    for (let i=0; i<tab1.length;i++){
        if (tab1[i][0] == tab2[0] && tab1[i][1] == tab2[1]){
            return true;
        }
    }
    return false;
}
function difFunction(accumulateur, valeurCourante){
    if (!tabIsIn(accumulateur, valeurCourante)){
        accumulateur.push(valeurCourante);
    }
    return accumulateur;
}
//let difPos = tailMoves.reduce(difFunction,[[0,0]])
//console.log(difPos.length);
console.log(newTail)


