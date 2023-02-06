const fs = require('fs')
const ipt = fs.readFileSync("list.txt", 'utf8').split('\n').map(String);

//getting data
function getData(accumulateur, valeurCourante, index, array){
    [S,B] = valeurCourante.split(":")
    lineS = S.split(",")
    lineB = B.split(",")
    xS = lineS[0].split("=").map(Number)[1]
    yS = lineS[1].split("=").map(Number)[1]
    xB = lineB[0].split("=").map(Number)[1]
    yB = lineB[1].split("=").map(Number)[1]
    let line = []
    line.push([xS,yS])
    line.push([xB,yB])
    accumulateur.push(line)
    return accumulateur;
}

let coordonates = ipt.reduce(getData,[])


// Treatment data

function dist([a,b],[c,d]){
    let distance = Math.pow((Math.pow(c-a,2)+Math.pow(d-b,2)),0.5)
    return distance
}

function treatment(element){
    let line = element
    let distance = dist(element[0],element[1])
    line.push(distance)
    let up = element[0][1] - distance
    let down = element[0][1] + distance
    let left = element[0][0] - distance
    let right = element[0][0] + distance
    line.push([up, down, left, right])
    return line
}
let treatedData = coordonates.map(treatment)


// finding extreme values

let init = [treatedData[0][3][0],treatedData[0][3][1],treatedData[0][3][2],treatedData[0][3][3]]

function findExtreme(accumulateur, valeurCourante){
    line = valeurCourante[3]
    if (line[0] < accumulateur[0]){
        accumulateur[0] = line[0]
    }
    if (line[1] > accumulateur[1]){
        accumulateur[1] = line[1]
    }
    if (line[2] < accumulateur[2]){
        accumulateur[2] = line[2]
    }
    if (line[3] > accumulateur[3]){
        accumulateur[3] = line[3]
    }
    return accumulateur
}
const [minUp, maxDown, minLeft, maxRight] = treatedData.reduce(findExtreme,init)

function translationX(x){
    return x-minLeft
}

function translationY(y){
    return y-minUp
}

// filling the matrix

let matrix = []

for(let i=minUp;i<=maxDown;i++){
    let line = []
    for (let j=minLeft;j<=maxRight;j++){
        line.push(0)
    }
    matrix.push(line)
}

for (let k=0;k<treatedData.length;k++){
    let S = treatedData[k]
    for (let i = S[3][0]; i<= S[3][1];i++){
        for (let j = S[3][2]; j<=S[3][3];j++){
            if (dist([S[0][0], S[0][1]],[j,i]) <= S[2]){
                matrix[Math.trunc(translationY(i))][ Math.trunc(translationX(j))] = 1
            }
        }
    }
}
console.log(matrix[Math.trunc(translationY(9))].filter(x => x==1).length) //line 10 is index 9
// this only works with a small matrix ...

