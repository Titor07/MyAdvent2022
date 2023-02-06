const fs = require('fs')
const ipt = fs.readFileSync("list.txt", 'utf8').split('\n').map(String);

function parseFunc(line){
    let array = line.split('').map(Number);
    return array;
}

function isVisibleTop(matrix, i, j){
    for(let k=i-1;k>-1;k--){
        if(matrix[i][j]<=matrix[k][j]){
            return false;
        }
    }
    return true;
}
function isVisibleDown(matrix, i, j){
    for(let k=i+1;k<hight;k++){
        if(matrix[i][j]<=matrix[k][j]){
            return false;
        }
    }
    return true;
}

function isVisibleRight(matrix, i, j){
    for(let k=j+1;k<width;k++){
        if(matrix[i][j]<=matrix[i][k]){
            return false;
        }
    }
    return true;
}

function isVisibleLeft(matrix, i, j){
    for(let k=j-1;k>-1;k--){
        if(matrix[i][j]<=matrix[i][k]){
            return false;
        }
    }
    return true;
}

function scoreTop(matrix, i, j){
    let k=i-1;
    let score = 1;
    while(k>0 && matrix[i][j]>matrix[k][j]){
        score++;
        k--;
    }
    return score;
}

function scoreLeft(matrix, i, j){
    let k=j-1;
    let score = 1;
    while(k>0 && matrix[i][j]>matrix[i][k]){
        score++;
        k--;
    }
    return score;
}

function scoreDown(matrix, i, j){
    let k=i+1;
    let score = 1;
    while(k<hight-1 && matrix[i][j]>matrix[k][j]){
        score++;
        k++;
    }
    return score;
}

function scoreRight(matrix, i, j){
    let k=j+1;
    let score = 1;
    while(k<width-1 && matrix[i][j]>matrix[i][k]){
        score++;
        k++;
    }
    return score;
}

let matrix = ipt.map(parseFunc);
let hight = matrix.length;
let width = matrix[0].length;
let res = [];
let scoreTab = []

for(let i=1;i<hight-1;i++){
    for(let j=1; j<width-1;j++){
        if (isVisibleDown(matrix,i,j) ||
            isVisibleTop(matrix,i,j)  ||
            isVisibleLeft(matrix,i,j) ||
            isVisibleRight(matrix,i,j)){
                res.push([matrix[i][j],i,j]);
            }
    }
}

for(let i=1;i<hight-1;i++){
    for(let j=1;j<width-1;j++){
        scoreTab.push(scoreDown(matrix,i,j)*scoreLeft(matrix,i,j)*scoreTop(matrix,i,j)*scoreRight(matrix,i,j));
    }
}
console.log(res.length+2*width+2*(hight-2));
console.log(scoreTab)
console.log(Math.max(...scoreTab));
