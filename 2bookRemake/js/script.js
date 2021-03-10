let mainDiv = document.createElement('div');
document.body.prepend(mainDiv);
let instructionDiv = document.createElement('div');
instructionDiv.innerHTML ="<p>Install xclip if it not installed before. Than execute next cli commands.</p><p>sed -e '$s/$//' -s *.json &gt; finalfile.txt</p><p>xclip -sel c &lt;  finalfile.txt</p><p>xclip -o &gt;../result.txt</p>";
mainDiv.prepend(instructionDiv);
let textArea = document.createElement('textarea');
mainDiv.append(textArea);
let mainButton = document.createElement('button');
let copyButton = document.createElement('button');
copyButton.innerText = 'COPY';
mainButton.innerText = 'CONVERT';
mainDiv.append(mainButton);
mainDiv.append(copyButton);
mainButton.addEventListener('click', converter);
copyButton.addEventListener('click', copy2clipboard);
let resultText = document.createElement('div');
mainDiv.append(resultText);


function converter(){
    let newText = '';
    let arrayOfObject = textArea.value.split('\n');
     for(singleObject of arrayOfObject){
        let rawText = JSON.parse(singleObject);
        for (line of rawText.tokens1){
            newText+=line[0];
            newText+=line[2];
     
    }
}
    resultText.innerText = newText;
}
function copy2clipboard(){
    navigator.clipboard.writeText(resultText.innerText);
}

