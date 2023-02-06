const fs = require('fs')
const ipt = fs.readFileSync("list.txt", 'utf8').split('\n').map(String);

function treatment(accumulateur, valeurCourante){
    let line = valeurCourante.split(",").map(Number)
    accumulateur[0].push(line)
    for (let i=0;i<3;i++){
        if (line[i] > accumulateur[1][i]){
            accumulateur[1][i] = line[i]
        }
    }
    return accumulateur
}

// max is an array which contains max dimensions of the structure
[treatedInput, max] = ipt.reduce(treatment,[[],[0,0,0]])

function dist(point1, point2){
    let sum = 0;
    for (let k=0; k<3; k++){
        sum = sum + Math.pow(point1[k] - point2[k], 2)
    }
    return Math.pow(sum, 0.5)
}

// count the amount of surface which doesn't touch an other

let nbFace = 6;

for (let i=1; i<treatedInput.length;i++){
    nbFace = nbFace + 6
    for (let j=0;j<i;j++){
        if (dist(treatedInput[i], treatedInput[j]) == 1){
            nbFace = nbFace - 2
        }
    }
}

// get air cubes

function isIn(array1, array2){
    for (let i=0;i<array1.length;i++){
        if (array1[i][0] == array2[0] && array1[i][1] == array2[1] && array1[i][2] == array2[2]){
            return true
        }
    }
    return false
}

let airCube = []

for (let i=0; i<max[0];i++){
    for (let j=0;j<max[1];j++){
        for (let k=0;k<max[2];k++){
            if (!isIn(treatedInput,[i,j,k])){
                airCube.push([i,j,k])
            }
        }
    }
}



let captured = []
let explored = []

airCube.forEach(cube => captured.push(count(cube,airCube, explored)))

function getAirNeighboor(cube, airCube, explored){
    let liste = []
    if (isIn(airCube,[cube[0] - 1, cube[1], cube[2]]) && !isIn(explored,[cube[0] - 1, cube[1], cube[2]])){
        liste.push([cube[0] - 1, cube[1], cube[2]])
    }
    if (isIn(airCube,[cube[0] + 1, cube[1], cube[2]]) && !isIn(explored,[cube[0] + 1, cube[1], cube[2]])){
        liste.push([cube[0] + 1, cube[1], cube[2]])
    }
    if (isIn(airCube,[cube[0], cube[1]+1, cube[2]]) && !isIn(explored,[cube[0], cube[1] + 1, cube[2]])){
        liste.push([cube[0], cube[1]+1, cube[2]])
    }
    if (isIn(airCube,[cube[0], cube[1]-1, cube[2]]) && !isIn(explored,[cube[0], cube[1] -1 , cube[2]])){
        liste.push([cube[0], cube[1]-1, cube[2]])
    }
    if (isIn(airCube,[cube[0], cube[1], cube[2]+1]) && !isIn(explored,[cube[0], cube[1], cube[2]+1])){
        liste.push([cube[0], cube[1], cube[2]+1])
    }
    if (isIn(airCube,[cube[0], cube[1], cube[2]-1]) && !isIn(explored,[cube[0] - 1, cube[1], cube[2]-1])){
        liste.push([cube[0], cube[1], cube[2]-1])
    }
    return liste
}

function eject(cube, airCube){
    let newAirCube = []
    for (let i=0;i<airCube.length ;i++){
        if (airCube[i][0] != cube[0] || airCube[i][1] != cube[1] || airCube[i][2] != cube[2]){
            newAirCube.push(cube)
        }
    }
    return newAirCube
}

function count(cube, airCube, explored){
    let isin = isIn(explored, cube)
    if (isin){
        return Infinity
    }
    if (!isin){
        explored.push(cube)
    }
    if (cube[0] == max[0] || cube[1] == max[1] || cube[2] == max[2]){
        return Infinity
    }
    if (cube[0] == 0 || cube[1] == 0 || cube[2] == 0){
        return Infinity
    }
    let airNeighboor = getAirNeighboor(cube, airCube, explored)
    //console.log(cube, "air nei ",airNeighboor)
    if (airNeighboor.length == 0){
        return 6
    }
    sum = 0
    for (let i=0; i<airNeighboor.length;i++){
        newcube = airNeighboor[i]
        sum = sum + 4 + count(newcube, airCube, explored)
        
    }
    return sum
}

let minus = 0
for (let k=0;k<captured.length;k++){
    if (captured[k] != Infinity){
        minus = minus + captured[k]
        console.log(captured[k])
    }
}





