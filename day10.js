const fs = require('fs')
const ipt = fs.readFileSync("list.txt", 'utf8').split('\n').map(String);



function scoreFun(accumulateur, valeurCourante, index, array){
    line = valeurCourante.split(" ");
    if (line[0] == "noop"){
        accumulateur[1] = accumulateur[1] + 1;
        if ((accumulateur[1]+20)%40 == 0){
            accumulateur[2] = accumulateur[2] + accumulateur[1]*accumulateur[0];
            console.log(accumulateur);
        }
    }
    if (line[0] == "addx"){
        for(let i=0;i<2;i++){
            accumulateur[1] = accumulateur[1] + 1;
            let points = Number(line[1]);
            if ((accumulateur[1]+20)%40 == 0){
                accumulateur[2] = accumulateur[2] + accumulateur[1]*accumulateur[0];
                console.log(accumulateur);
            }
            if (i==1){
                accumulateur[0] = accumulateur[0] + points
            }
        }  
    }
    return accumulateur;
  }

let register = 1;
let cycle = 0;
let strengh = 0;


let res = ipt.reduce(scoreFun,[register,cycle,strengh])

const ipt2 = fs.readFileSync("list2.txt", 'utf8').split('\n');
const ipt3 = fs.readFileSync("list2.txt", 'utf8').split('\n');


function toDot(element){
    let newElement = element.split("").map(String).map(mapFunc)
    return newElement;
}
function mapFunc(element){
    return '.'
}
let stripes = ipt3.map(toDot);

cycle = 0;
let indCol = 0;
let indLine = 0;

for(let i=0;i<ipt.length;i++){
    line = ipt[i].split(" ")
    if (line[0] == "noop"){
        cycle++;
        indLine = Math.floor((cycle-1) / 40);
        indCol = ((cycle-1)%40);
        if (register == indCol || register + 1  == indCol || register -1 == indCol){
            stripes[indLine][indCol] = '#'
        }
        
    }
    if (line[0] == "addx"){
        for(let j=0;j<2;j++){
            cycle++;
            indLine = Math.floor((cycle-1) / 40)
            indCol = (cycle-1)%40;
            if (register == indCol || register + 1  == indCol || register -1 == indCol){
                stripes[indLine][indCol] = '#'
            }
            
            if (j==1){
                let points = Number(line[1]);
                register = register + points;
            }
            
        }
    }
    console.log("cycle "+ cycle,"col " + indCol, "register " + register);
}

res2 = stripes.map(el => el.join(""))
console.log(res2);







