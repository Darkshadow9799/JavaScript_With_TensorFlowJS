async function predict() {
    const model = await tf.loadLayersModel('tfjs_models/model.json');
    //model.summary();
    let image = $("#pred_img").get(0);
    let tensorImg = tf.browser.fromPixels(image,3)
                    .resizeNearestNeighbor([224,224])
                    .toFloat()
                    .expandDims()
                    .reverse(-1);

    let normalizationOffset = tf.scalar(127.5);
    var normalized = tensorImg.toFloat().sub(normalizationOffset).div(normalizationOffset);
    let prediction = await model.predict(normalized).data();
    console.log(Math.max(...prediction));   
    document.getElementById('result').innerHTML='Results: ['+prediction+']';
}


predict();
/* 
if preds==0:
    preds="The leaf is diseased cotton leaf"
elif preds==1:
    preds="The leaf is diseased cotton plant"
elif preds==2:
    preds="The leaf is fresh cotton leaf"
else:
    preds="The leaf is fresh cotton plant"
*/

// Variables:
// var, let and const
/* Functions:
1. Create function
2. Call the function

Create:
function fun() {
    alert('Hello World');
}

Call:
fun();

*/

/*
Let's create a function that takes in the name and return "Hello <name>"

1. Create:
function greeting(){
    let name = prompt('What is ur name?');
    console.log('Hello '+name);
}

2. Call:
greeting();
*/

/*
While loop:

let num=0;

while(num<100){
    num +=1;
    console.log(num);
}
*/

/*
For loop:

for (let num=0; num<100; num++){
    console.log(num);
}
*/

/*
Data Types:

Number: let age=18;
String: let name='Aayush';
Object: let name={first : 'Aayush',last: 'Jain'};
Boolean: let truth=false;
Array: let groceries=['apple','banana','oranges'];
Undefined: let name;
Null: let nothing=null;
*/

/*
String methods:
let name='banana';

to escape a line '\n' is used

To find an index:
console.log(name.indexOf('nan'));
It will return 2 as in 'banana' ,'nan' starts from 2

Slicing:
console.log(name.slice(2,6));

Replacing:
console.log(name.replace('ban','123'));

Uppercase: name.toUpperCase();
Lowercase: name.toLowerCase();
CharAt: name.charAt(2);
Split: name.split('');
*/

/* 
Arrays:

let fruits=['banana','apple','orange'];

let fruits=new Array('banana','apple','orange');

Join: fruits.join('-');
Pop: fruits.pop(); Pop off last element
Push: fruits.push('strawberries');
Shift: fruits.shitf(); Removes 1st element
Unshift: fruits.unshift('kiwi'); Add the first element
Reverse: fruits.reverse();
Concat: <1st array>.concat(<2nd array>);
Sort: <array name>.sort();

let numbers=[5,10,2,6,25,20];
console.log(numbers.sort(function(a,b){ return a-b;}));
console.log(numbers.sort(function(a,b){ return b-a;}));

fruits.forEach((item, index) =>{
    console.log(item+":"+index);
});
*/

/*
Objects:
It is like Dictionaries in python.
let name={
    first: 'Aayush', 
    last: 'Jain',
    fullInfo: function() {
        return this.first + '\n' + this.last;
    }
};

console.log(name.fullInfo());

It is like key:value.
console.log(fruits.first);

To change: 
name.first="Darkshadow";
*/

/*
Conditions and Control Flows:

var age=prompt("Whats ur age?");
let status;
if((age>=18) && (age<=34)){
    status="target demo";
    console.log(status);
}
else{
    status="Not my status";
    console.log(status);
}

Switch statement:
var day=prompt("Enter week day");
switch(day){
    case 1:
        console.log('Sunday');
        break;
    case 2:
        console.log('Monday');
        break;
    case 3:
        console.log('Tuesday');
        break;
    case 4:
        console.log('Wednesday');
        break;
    case 5:
        console.log('Friday');
        break;
    case 6:
        console.log('Saturday');
        break;
    default:
        return;
}
*/

