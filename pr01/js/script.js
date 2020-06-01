let p_id = 1;
let p_created = 100;
let firstFunction = function (text = "HELLO") {
  document.getElementById("p" + (p_id++) + "_id").innerText="My First Function" + text;
};

/*
let a = 10;
 let b = parseInt(prompt("Enter number"));
 if (isNaN(b)){
   alert("B is Nan");
 }
 else {
   let c = a + b;
   document.writeln("<p>" + c.toString() + "</p>");
   console.log(c);
 }
  */
 let myArray = ["One", "Two", "Three"];
 console.log(myArray);
 myArray[4] = 'Four';
 console.log(...myArray);

 let user = [["Tom", 25, false], ['Bill', 18, true], ["Andrey", 42, false]];
let userArrayString = "";
for (let u of user){
  userArrayString += u.toString() + " // ";
}
 document.getElementById("p" + (p_id++) + "_id").innerText=userArrayString;
 console.log(user[1][1]);
 user[1][2] = false;
 console.log(user[1]);
 for (let i = 0; i<user.length; i++){
   console.log(user[i]);
 }
 firstFunction();


 for(let sUser of user){
   document.getElementById("p" + (p_id++) + "_id").innerText = sUser.toString();
 }
firstFunction("GOOD BYE");

(function () {
  alert("Self invoke function");
}());

let calculator = (function ()
{
let mem = {num : 0};
  return result = {
    sum: function (x) {
      return mem.num += x;
    },
    subtract: function (x) {
      return mem.num -= x;
    },
    clr:function () {
      mem.num = 0;
    }

  }}());

let calcTest = function () {
  let numbr = 0;
  return result = {
    sum: function (x) {
      return numbr += x;
    },
    subtract: function (x) {
      return numbr - +x;
    },
    clr: function () {
      numbr = 0;
    }
  }
};

console.log(calculator.sum(10));
console.log(calculator.sum(30));
calculator.clr();
console.log(calculator.subtract(15));

console.log(calcTest().sum(5));
console.log(calcTest().subtract(1));

let func1 = (x=-7,y=0)=>{console.log((x+7)/(y-3))};
func1(1, 4);
func1();
func1(0, 3);

let insertTextAfterNode = function (text, node) {

    let p = document.createElement("p");
    p.id = (p_created++).toString();
    p.innerText = text;
    document.getElementById(node).before(p);

};

let userfunc = (uname, uage) =>({name: uname, age: uage});
let vasya = userfunc("Vasya", 33);
document.getElementById("p" + (p_id++) + "_id").innerText = vasya.name + ' ;' + vasya.age;
let dateNow = new Date();
document.getElementById("p" + (p_id++) + "_id").innerText = dateNow.getHours() + ':'+dateNow.getMinutes()+":"+ dateNow.getSeconds();

let realMan = { name:"REAL_MAN",
                age:50,
                "full name" : "THE_REAL_MAN",
                display: function() {
                  insertTextAfterNode(this.name + " ," + this.age + ";", "h2_id");
                },

                "full display" : function() {console.log(this["full name"])}};
realMan.display();
realMan["full display"]();
delete realMan["name"];
console.log(realMan.name);

let hasRealManName = "name" in realMan;
console.log(hasRealManName);

let hasRealManFullDisplay = realMan["full display"]!==undefined;
console.log(hasRealManFullDisplay);

let hasRealManWeight = realMan.hasOwnProperty("weight");
console.log(hasRealManWeight);

for (let key in realMan){
  console.log(key + ":" + realMan[key]);
}

let creator = (uName, uAge)=> {return{name:uName, age:uAge, displayInfo:()=>console.log("User name :" + uName + "; User age :" + uAge)}};
creator("Mikel", 18).displayInfo();

function printUserToPage (user){
  insertTextAfterNode("User name : "+ user.name + "; User Age : " + user.age, "h2_id");
}

let user1 = creator("USER 1", 10);
let user2 = creator ("USER2", 15);
printUserToPage(user1);
printUserToPage(user2);
printUserToPage(creator("USER3", 18));
user1.displayInfo();
user2.displayInfo();

function Buyer (name, age, money){
  this.name = name;
  this.age = age;
  this.money = money;
  let _credit = 0;
  this.showInfo = function(){
    insertTextAfterNode(this.name + ":" + this.age + ":" + this.money, "h2_id");
    };
  this.showReachest = function(array){
    let maxMoney = 0;
    for (let buyer of array) {
      if (buyer.money > maxMoney) {
        maxMoney = buyer.money
      }
    insertTextAfterNode("Reachest buyer has : " + maxMoney + " money;", "h2_id");
   }};
  this.getCredit = function(){
    console.log(_credit);
    return _credit;
  };

  this.setCredit = function(credit){
    if (typeof credit == "number" && credit >=0)
    {
      _credit = credit;
      console.log("was installed " + credit + " credit.")
    } else {
      console.log("unacceptable value");
    }
  }
}

let buyer1 = new Buyer("Buyer_1", 20, 350);
buyer1.showInfo();

let buyer_array = [buyer1, new Buyer("Buyer_2", 45, 135), new Buyer("Buyer_3", 46, 600)];
buyer1["showReachest"](buyer_array);

Buyer.prototype.payed = function (price) {
  this.money -= price;
  insertTextAfterNode("User " + this.name + " payed " + price + " money ",
      "h2_id");
};
buyer_array[2].payed(550);
buyer_array[2].showReachest(buyer_array);
let buyer2 = buyer_array[2];
buyer2.getCredit();
buyer2.setCredit(-100);
buyer2.setCredit(1000);
buyer2.getCredit();
function getRandom(maxValue){
  return Math.floor(Math.random()*maxValue);
}
function delay(func, timeout){
  let now = new Date().getTime();
  while (new Date().getTime() < now+timeout){

  }
  func();
}

document.getElementById("p_last_id").innerText="....ADDED BY JAVASCRIPT";


