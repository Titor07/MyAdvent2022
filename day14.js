const fs = require('fs')
const ipt = fs.readFileSync("list.txt", 'utf8').split('\n').map(String);

// I chose my data structure : matrix

// Find dimensions

let right = 0
let down = 0;

let res = ipt.reduce(dimFunction,[right, down])

function maxFunc(accumulateur, valeurCourante, index, array){
    line = valeurCourante.split(",").map(Number);
    if (accumulateur[0]<line[0]){
        accumulateur[0] = line[0]
    }
    if (accumulateur[1]<line[1]){
        accumulateur[1] = line[1]
    }
    return accumulateur
}
function dimFunction(accumulateur, valeurCourante, index, array){
    line = valeurCourante.split("->")
    accumulateur = line.reduce(maxFunc, accumulateur)
    return accumulateur
}



let myMatrix = []

for (let i=0;i<res[1]+10;i++){
    let line = []
    for (let j=0; j<res[0]+10; j++){
        line.push(0)
    }
    myMatrix.push(line)
}


// fill the matrix

let newMatrix = ipt.reduce(instruction, myMatrix)

function instruction(accumulateur, valeurCourante, index, array){
    line = valeurCourante.split("->")
    accumulateur = line.reduce(fillFunction, accumulateur)
    return accumulateur
}

function fillFunction(accumulateur, valeurCourante, index, array){
    if (index < array.length - 1){
        let array1 = valeurCourante.split(",").map(Number)
        let array2 = array[index + 1].split(",").map(Number)
        
        if (array1[0] == array2[0]){
            
            for(let i=Math.min(array1[1], array2[1]); i<=Math.max(array1[1], array2[1]); i++){
                accumulateur[i][array1[0]] = 1
            }
        }
        else {
            for(let i=Math.min(array1[0], array2[0]); i<=Math.max(array1[0], array2[0]); i++){
                accumulateur[array1[1]][i] = 1
            }
        }
        return accumulateur
    }
    return accumulateur
}


let amount = 0
let newRock = [0,500]

function findAmount(newMatrix, newRock){
    while(true){
    while(!isBlocked(newMatrix, newRock)){
        newRock = move(newMatrix, newRock)
        if (isFalling(newMatrix, newRock)){
            return amount
        }
    }
    newMatrix = addRock(newMatrix, newRock)
    amount = amount + 1

    newRock = [0,500]
}
}

let nb = findAmount(newMatrix, newRock)

console.log(nb)
function isFalling(mat, array){
    if (array[0] == mat.length - 1){
        return true
    }
    return false
}

function isBlocked(mat, array){
    if (mat[array[0]+1][array[1]] == 1 && mat[array[0] + 1][array[1] + 1] == 1 && mat[array[0] + 1][array[1] - 1] == 1){
        return true
    }
    return false
}

function move(mat, array){
    if (mat[array[0] + 1][array[1]] == 0){
        array[0] = array[0] + 1
        return array
    }
    if (mat[array[0] + 1][array[1] - 1] == 0){
        array[0] = array[0] + 1
        array[1] = array[1] - 1
        return array
    }
    if (mat[array[0] + 1][array[1] + 1] == 0){
        array[0] = array[0] + 1
        array[1] = array[1] + 1
        return array
    }
}

function addRock(mat, array){
    let newMat = mat
    newMat[array[0]][array[1]] = 1
    return newMat
}


