let firstFunction = function (text = "HELLO") {
  document.write("<p style='color: crimson'>" + "My First Function " + text + "</p>");
};

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
 let myArray = ["One", "Two", "Three"];
 console.log(myArray);
 myArray[4] = 'Four';
 console.log(...myArray);

 let user = [["Tom", 25, false], ['Bill', 18, true], ["Andrey", 42, false]];
 document.writeln(...user.toString());
 console.log(user[1][1]);
 user[1][2] = false;
 console.log(user[1]);
 for (let i = 0; i<user.length; i++){
   console.log(user[i]);
 }
 firstFunction();

 for(let sUser of user){
   document.write("<p>" + sUser+ "</p>");
 }
firstFunction("GOOD BYE");

