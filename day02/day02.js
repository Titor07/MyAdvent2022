const fs = require('fs')
const ipt = fs.readFileSync("list1.txt", 'utf8').split('\n').map(String);
console.log(ipt);

function scoreVictory(match){
    [Away, Home] = match.split(' ');
    console.log(Home);
    if (Home == 'X'){
        if (Away == 'C'){
            return 6;
        }
        if (Away == 'A'){
            return 3;
        }
        return 0;
    }
    if (Home == 'Y'){
        if (Away == 'A'){
            return 6;
        }
        if (Away == 'B'){
            return 3;
        }
        return 0;
    }
    if (Home == 'Z'){
        if (Away == 'B'){
            return 6;
        }
        if (Away == 'C'){
            return 3;
        }
        return 0;
    }
}

function scoreElement(match){
    [Away, Home] = match.split(' ');
    if (Home == 'X'){
        return 1;
    }
    if (Home == 'Y'){
        return 2;
    }
    if (Home == 'Z'){
        return 3;
    }
}

function func(match){
    return scoreVictory(match) + scoreElement(match);
}

const tabSum = ipt.map(func);
console.log(tabSum.reduce((accumulator, currentValue) => accumulator + currentValue,0));

// second exercize
function secondScoreVictory(match){
    [Away, Home] = match.split(' ');
    if (Home == 'X'){
        return 0;
    }
    if (Home == 'Y'){
        return 3;
    }
    return 6;
}
function secondScoreElement(match){
    [Away, Home] = match.split(' ');
    if (Home == 'X'){
        if (Away == 'A'){
            return 3;
        }
        if (Away == 'B'){
            return 1;
        }
        return 2;
    }
    if (Home == 'Y'){
        if (Away == 'A'){
            return 1;
        }
        if (Away == 'B'){
            return 2;
        }
        return 3;
    }
    if (Home == 'Z'){
        if (Away == 'A'){
            return 2;
        }
        if (Away == 'B'){
            return 3;
        }
        return 1;
    }
}

function secondFunc(match){
    return secondScoreVictory(match) + secondScoreElement(match);
}

const secondTabSum = ipt.map(secondFunc);
console.log(secondTabSum.reduce((accumulator, currentValue) => accumulator + currentValue,0));