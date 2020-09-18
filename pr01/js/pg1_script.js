let maindiv = document.createElement('div');
maindiv.setAttribute('id', 'main_div');
document.body.appendChild(maindiv);

let p1 = document.createElement("p");
p1.innerText = 'First p element';
p1.style.cssText = 'center';
p1.setAttribute('class', 'text-monospace');
maindiv.appendChild(p1);

let p2 = document.createElement('p');
p2.innerText = 'P2 element';

maindiv.insertBefore(p2, p1);

let clonedNode = maindiv.cloneNode(true);

document.body.appendChild(clonedNode);

function getTagElemName(elem) {
  for (let i in elem.childNodes) {
    if (elem.childNodes[i].nodeType === 1) {
      console.log(elem.childNodes[i].tagName);
      getTagElemName(elem.childNodes[i]);
    }
  }
}

let rootElem = document.documentElement;
console.log(rootElem.tagName);
getTagElemName(rootElem);

document.getElementsByTagName("p")[0].setAttribute('class',
    'text-default');
document.getElementsByTagName("p")[1].style.fontFamily = 'Courier New';
document.getElementsByTagName('p')[2].className = 'text-warning';
let rectdivval = document.createElement("p");
rectdivval.innerText = document.getElementById('rect').offsetHeight + 'x'
    + document.getElementById('rect').offsetWidth;

document.body.appendChild(rectdivval);

let rectparam = document.getElementById('rect').getBoundingClientRect();
console.log(rectparam.toJSON());

document.querySelector('p.text-monospace').className = document.querySelector(
    'p.text-monospace').className + ' text-secondary';

let pclasslit = document.querySelector('p.text-monospace').classList;
pclasslit.add('info-color-dark');

let div4button = document.createElement('div');
let buttonElement = document.createElement('button');
div4button.appendChild(buttonElement);
document.body.appendChild(div4button);
buttonElement.className = 'btn btn-indigo';

let div4button1 = document.createElement('div');
let buttonElement1 = document.createElement('button');
div4button1.appendChild(buttonElement1);
buttonElement1.innerText = 'START';
document.body.appendChild(div4button1);
buttonElement1.className = 'btn btn-indigo';
buttonElement1.addEventListener("click", clickbutton2);

let rectDiv = document.getElementById('rect');

rectDiv.style.position = 'absolute';
let divInRect = document.createElement('div');
divInRect.className = 'col';
divInRect.style = "margin-top: 55px;margin-left: 10px;";
rectDiv.append(divInRect);




function clickonbutton1() {
  let date = new Date;
  buttonElement.innerText = date.getHours() +':'+date.getMinutes()+':'+date.getSeconds();
}

let funcInterval = null;
function clickbutton2(){

  if (buttonElement1.innerText==="START"){
    buttonElement1.innerText = 'STOP';
    startRectangleMoving()
  } else {
    buttonElement1.innerText = 'START';
    stopRectangleMoving();

  }

}


function moverect(){
  let y = Math.round(getRandomArbitrary(0,
      window.innerWidth - document.getElementById('rect').offsetWidth));
  let x = Math.round(getRandomArbitrary(0,
      window.innerHeight - document.getElementById('rect').offsetHeight));

  divInRect.innerText =  "[" + x + ' - ' + y + ']';
  rectDiv.style.top = x+'px';
  rectDiv.style.left = y+'px';

}
buttonElement.addEventListener('click', clickonbutton1);
buttonElement.addEventListener('mousemove', clickonbutton1);
rectDiv.addEventListener('mousemove', moverect);

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function startRectangleMoving(){
  rectDiv.removeEventListener('mousemove', moverect);
  funcInterval = setInterval(moverect, 1000);
}

function stopRectangleMoving(){
  clearInterval(funcInterval);
  rectDiv.addEventListener('mousemove', moverect);
}

let f1 = (question, yes, no)=>{
  if (confirm(question)) yes()
  else {
    no();
  }}
f1("AreYouAgree", () => alert('You Are Agree'),
    () => alert('You Are Disagree'));

let nextDiv = document.createElement("div");
nextDiv.id = 'div_1';
nextDiv.style.height = nextDiv.style.width = '50px';
nextDiv.style.backgroundColor = 'yellow';
nextDiv.style.position = 'relative';
nextDiv.style.left = '300px';
document.getElementsByTagName('div')[5].appendChild(nextDiv);
nextDiv.onclick = changeColorOnClick;

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeColorOnClick(evt){
  evt.currentTarget.style.backgroundColor = getRandomColor();
}

let blackDiv = document.createElement('div');
blackDiv.id = 'blackDiv';
blackDiv.style.width = '100px';
blackDiv.style.height = '100px';
blackDiv.style.margin = '10%';
blackDiv.style.backgroundColor = 'black';

document.body.appendChild(blackDiv);

let whiteDiv = document.createElement('div');
whiteDiv.id = 'whiteDiv';
whiteDiv.style.width = '50px';
whiteDiv.style.height = '50px';
whiteDiv.style.margin = '25px';
whiteDiv.style.backgroundColor = 'white';

blackDiv.appendChild(whiteDiv);

function clickOnBlack(elm) {
console.log('i am black div');
}
function clickOnWhite(elm) {
  elm.stopPropagation();
  console.log('i am white div');

}
function clickOnBody(elm) {
  console.log('i am body');
}

whiteDiv.addEventListener('click', clickOnWhite, true);
blackDiv.addEventListener('click', clickOnBlack, true);
document.body.addEventListener('click', clickOnBody, true);

let mouseCoordinateDiv = document.createElement('div');
mouseCoordinateDiv.id = 'mouseCoordinateDiv';
mouseCoordinateDiv.style.textAlign = 'center';
document.body.appendChild(mouseCoordinateDiv);
document.body.addEventListener('mousemove', mousePositionCoordinate);


function mousePositionCoordinate(element){
  mouseCoordinateDiv.innerText = `X = ${element.screenX}; Y = ${element.screenY} `;

}









