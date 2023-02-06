const fs = require('fs')
const ipt = fs.readFileSync("list.txt", 'utf8').split('\n').map(Number);


function assignIndex(value, index){
    return [value, index]
}

let treatedInput = ipt.map(assignIndex)

function move(array, value, index){
    if (value + index> 0){
        return (value+index)%(array.length -1)
    }
    if (value + index<0){
        return (array.length-1 + (value+index)%(array.length -1))
    }
    if (value+index == 0){
        return 0
    }
}


function mixFunction(previous, value, index, array){
    if (previous[index][1]+previous[index][0]>=0 && previous[index][1]+previous[index][0]<previous.length){
        for (let i = 0;i<previous.length; i++){
            if (previous[i][1]>previous[index][1] && previous[i][1]<= previous[index][1]+previous[index][0]){
                previous[i][1] = move(previous, -1, previous[i][1])
            }
        }
        previous[index][1] = move(previous, previous[index][0], previous[index][1])
    }
    if (previous[index][1]+previous[index][0]<0 || previous[index][1]+previous[index][0]>=previous.length){
        for (let i = 0;i<previous.length; i++){
            if (previous[i][1]>previous[index][1] && previous[i][1]<=previous.length){
                previous[i][1] = move(previous, -1, previous[i][1])
            }
            if (previous[i][1]>= 0 && previous[i][1] <= (previous[index][1]+previous[index][0])%(previous.length-1)){
                previous[i][1] = move(previous, -1, previous[i][1])
            }
        }
        previous[index][1] = move(previous, previous[index][0], previous[index][1])
    }

    console.log(previous)
    return previous
}
let mixedList = treatedInput.reduce(mixFunction, treatedInput)
//console.log(mixedList)