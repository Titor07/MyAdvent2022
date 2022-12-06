const fs = require('fs')
const ipt = fs.readFileSync("list.txt", 'utf8').split('').map(String);
console.log(ipt);

function filterFunc(element, index, array) {
    if (index >= 3){
        [a,b,c,d] = [array[index-3], array[index-2], array[index -1], array[index]]
            return (![b,c,d].includes(a) && ![c,d].includes(b) && ![d].includes(c))
    }
}

console.log(ipt.findIndex(filterFunc)+1);

function allDifferent(tab){
    for (let i=0; i< tab.length - 1; i++){
        if (tab[i] === tab[i+1]){
            return false;
        }
    }
    return true;
}

function secondFilter(element, index, array){
    if (index >= 13){
        let followed = [];
        let numTab = [];
        for (let i=0; i<14;i++){
            followed.push(array[index - i]);
        }
        numTab = followed.map(el => el.charCodeAt());
        numTab.sort(function(a, b) {
            return a - b;
          });
        return (allDifferent(numTab));
    }
}

console.log(ipt.findIndex(secondFilter) + 1);