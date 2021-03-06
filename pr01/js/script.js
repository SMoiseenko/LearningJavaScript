"use strict";

let p_id = 1;
let p_created = 100;
let pic_id = 1000;
let firstFunction = function (text = "HELLO") {
  document.getElementById(
      "p" + (p_id++) + "_id").innerText = "My First Function" + text;
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
for (let u of user) {
  userArrayString += u.toString() + " // ";
}
document.getElementById("p" + (p_id++) + "_id").innerText = userArrayString;
console.log(user[1][1]);
user[1][2] = false;
console.log(user[1]);
for (let i = 0; i < user.length; i++) {
  console.log(user[i]);
}
firstFunction();

for (let sUser of user) {
  document.getElementById("p" + (p_id++) + "_id").innerText = sUser.toString();
}
firstFunction("GOOD BYE");

(function () {
  alert("Self invoke function");
}());

let calculator = (function () {
  let mem = {num: 0};
  return {
    sum: function (x) {
      return mem.num += x;
    },
    subtract: function (x) {
      return mem.num -= x;
    },
    clr: function () {
      mem.num = 0;
    }

  }
}());

let calcTest = function () {
  let numbr = 0;
  return {
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

let func1 = (x = -7, y = 0) => {
  console.log((x + 7) / (y - 3))
};
func1(1, 4);
func1();
func1(0, 3);

let insertTextAfterNode = function (text, node) {

  let p = document.createElement("p");
  p.id = (p_created++).toString();
  p.innerText = text;
  document.getElementById(node).before(p);

};

let userfunc = (uname, uage) => ({name: uname, age: uage});
let vasya = userfunc("Vasya", 33);
document.getElementById("p" + (p_id++) + "_id").innerText = vasya.name + ' ;'
    + vasya.age;
let dateNow = new Date();
document.getElementById("p" + (p_id++) + "_id").innerText = dateNow.getHours()
    + ':' + dateNow.getMinutes() + ":" + dateNow.getSeconds();

let realMan = {
  name: "REAL_MAN",
  age: 50,
  "full name": "THE_REAL_MAN",
  display: function () {
    insertTextAfterNode(this.name + " ," + this.age + ";", "h2_id");
  },

  "full display": function () {
    console.log(this["full name"])
  }
};
realMan.display();
realMan["full display"]();
delete realMan["name"];
console.log(realMan.name);

let hasRealManName = "name" in realMan;
console.log(hasRealManName);

let hasRealManFullDisplay = realMan["full display"] !== undefined;
console.log(hasRealManFullDisplay);

let hasRealManWeight = realMan.hasOwnProperty("weight");
console.log(hasRealManWeight);

for (let key in realMan) {
  console.log(key + ":" + realMan[key]);
}

let creator = (uName, uAge) => {
  return {
    name: uName,
    age: uAge,
    displayInfo: () => console.log(
        "User name :" + uName + "; User age :" + uAge)
  }
};
creator("Mikel", 18).displayInfo();

function printUserToPage(user) {
  insertTextAfterNode("User name : " + user.name + "; User Age : " + user.age,
      "h2_id");
}

let user1 = creator("USER 1", 10);
let user2 = creator("USER2", 15);
printUserToPage(user1);
printUserToPage(user2);
printUserToPage(creator("USER3", 18));
user1.displayInfo();
user2.displayInfo();

function Buyer(name, age, money) {
  this.name = name;
  this.age = age;
  this.money = money;
  let _credit = 0;
  this.showInfo = function () {
    insertTextAfterNode(this.name + ":" + this.age + ":" + this.money, "h2_id");
  };
  this.showReachest = function (array) {
    let maxMoney = 0;
    for (let buyer of array) {
      if (buyer.money > maxMoney) {
        maxMoney = buyer.money
      }
      insertTextAfterNode("Reachest buyer has : " + maxMoney + " money;",
          "h2_id");
    }
  };
  this.getCredit = function () {
    console.log(_credit);
    return _credit;
  };

  this.setCredit = function (credit) {
    if (typeof credit == "number" && credit >= 0) {
      _credit = credit;
      console.log("was installed " + credit + " credit.")
    } else {
      console.log("unacceptable value");
    }
  }
}

let buyer1 = new Buyer("Buyer_1", 20, 350);
buyer1.showInfo();

let buyer_array = [buyer1, new Buyer("Buyer_2", 45, 135),
  new Buyer("Buyer_3", 46, 600)];
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

function getRandom(maxValue) {
  return Math.floor(Math.random() * maxValue);
}

function delay(func, timeout) {
  let now = new Date().getTime();
  while (new Date().getTime() < now + timeout) {

  }
  func();
}

document.getElementById("p_last_id").innerText = "....ADDED BY JAVASCRIPT";
let greet = new Function('', 'insertTextAfterNode("Здрасте", "h2_id");');

function newGreet() {
  insertTextAfterNode("И снова, Здрасте", "h2_id");
}

greet();
console.log(newGreet.name);
newGreet.call(this);

console.log(typeof func1());
console.log("----FIN----");

function Animal(name, population) {
  this.name = name;
  this.population = population;
  this.makeSound = function () {
    insertTextAfterNode("I am undefined animal, cant make sound", "h2_id");
  }
}

Animal.prototype.sound = "NO SOUND";

function Dog(name, population, sound) {
  Animal.call(this, name, population);
  this.sound = sound;
  this.makeSound = function () {
    insertTextAfterNode(
        "I am a " + name + ". My population are " + population + "; I say: "
        + sound + ".", "h2_id")

  }
}

Dog.prototype = Object.create(Animal.prototype);

let goodDog = new Dog("Pitbull", 125000, "Gav-gaV");
goodDog.makeSound();
let animalUndef = new Animal("Undef", 0);
animalUndef.makeSound();

let myRequest = new XMLHttpRequest();
myRequest.open("GET", "https://reqres.in/api/users?page=2", false);
myRequest.send();
let myRequestStatus = myRequest.status;
if (myRequestStatus === 200) {
  let myResponse = JSON.parse(myRequest.responseText);
  let myData = myResponse.data;
  for (let i = 0; i < myData.length; i++) {
    let {id: uId, email: uEmail, first_name: uFirstName, last_name: uLastName} = myData[i];
    insertTextAfterNode(
        "id : " + uId + "; email : " + uEmail + "; first_name : " + uFirstName
        + "; last_name : " + uLastName, "h2_id");
  }
}

let [, {money: b2Money}] = buyer_array;
insertTextAfterNode(b2Money, "h2_id");

for (let i = 0; i < 10; i++) {
  insertTextAfterNode(Math.random(), "h2_id");
}

let daysArray = ["Mon", "Wed", "Fri"];
let changedDaysArray = daysArray.slice();
changedDaysArray[2] = "Sun";
console.log(daysArray);
console.log(changedDaysArray);
daysArray.unshift("Sat");
daysArray.splice(-1);

function isNexTDayInArray(array, day) {
  return array.some(x => {
    return x === day;
  })
}

console.log(daysArray);
console.log(isNexTDayInArray(daysArray, "Mon"));

insertTextAfterNode("Aloha ".repeat(4), "h2_id");

for (let buyer of buyer_array) {

  let stringTemplate = `His name is ${buyer.name} and his age is ${buyer.age}`;
  insertTextAfterNode(stringTemplate, "h2_id");
}

let regExp = /Four/g;
insertTextAfterNode(
    "RegExp result of testing " + myArray[4] + "on regexp " + regExp + " is "
    + regExp.test(myArray[4]), "h2_id");

let parseThisString = "One Two Three Four Five Six Seven";
insertTextAfterNode(parseThisString.replace(regExp, "TEN"), "h2_id");

let nameRegExp = /[a-z]{4,6}/g;
let anonymousName = "ANONYMOUS";
let enteredName = prompt("Enter your name", `${anonymousName}`);
if (nameRegExp.test(enteredName)) {
  alert(`Hello ${enteredName}`);
} else {
  if (confirm(`Try again ${anonymousName}`)) {
    location.reload();
  }

}

insertTextAfterNode(navigator.userAgent, "h2_id");
insertTextAfterNode(screen.width + "*" + screen.height + "px;", "h2_id");
insertTextAfterNode(location.hostname, "h2_id");
//location.href = "https://google.com";

let newWindow = open("https://google.com", "_blank",
    "width=1980, height=1050, resizable=no);");
newWindow.focus();

function closeThatWindow(windowName) {
  windowName.close();
}

setTimeout(closeThatWindow(newWindow), 2000);

function geolocOk(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let altitude = position.coords.altitude;
  let speed = position.coords.speed;
  insertTextAfterNode(
      ` You current position is: latitude:${latitude}, longitude:${longitude}, altitude:${altitude}, speed:${speed}.`,
      "h2_id");
}

function geolocError(obj) {
  insertTextAfterNode("Geolocation can`t be found. Try again later...",
      "h2_id");
}

navigator.geolocation.getCurrentPosition(geolocOk, geolocError);

function timeToH3() {
  dateNow = new Date;
  let hourNow = (dateNow.getHours() < 10) ? '0' + dateNow.getHours()
      : dateNow.getHours();
  let minuteNow = (dateNow.getMinutes() < 10) ? '0' + dateNow.getMinutes()
      : dateNow.getMinutes();
  let secondNow = (dateNow.getSeconds() < 10) ? '0' + dateNow.getSeconds()
      : dateNow.getSeconds();
  document.getElementById(
      "last_time").innerHTML = `<span style="color:orangered">${hourNow}</span><span style="color:black">:</span><span style="color: seagreen">${minuteNow}</span><span style="color:black">:</span><span style="color: dodgerblue">${secondNow}</span>`;
}

let clockIntervalID = setInterval(timeToH3, 1000);

setTimeout(()=>document.getElementById("h2_id").style.textAlign = "left", 9000);
let qtyOfPElem = document.getElementsByTagName('p');
insertTextAfterNode("We have " + qtyOfPElem.length + " of <p> elements.",
    "h2_id");

let htmlforlastbuttom = '<div class="row d-flex justify-content-center"><a href="pg1.html" class="btn btn-elegant">PAGE 1</a></div>';
setTimeout(() => {clearInterval(clockIntervalID);document.getElementById("main_div").innerHTML = htmlforlastbuttom}, 10000);




