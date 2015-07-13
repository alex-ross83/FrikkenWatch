//var initialization
var aTens = [ "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
var aOnes = [ "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", 
  "Nineteen" ];
var sWords = ["Damn", "Fucking", "Flippin", "Frikken", "Effin", ""];

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        'use strict';
        window.setTimeout(callback, 60000 / 60);
    };

function getDate() {
    'use strict';

    var date;
    try {
        date = tizen.time.getCurrentDateTime();
    } catch (err) {
        console.error('Error: ', err.message);
        date = new Date();
    }

    return date;
}

function ConvertToTens(num)
{ 
   var cNum, nNum, cWords = "";
   num %= 100;
   if (num > 19) {
      /* Tens. */
      cNum = String(num);
      nNum = Number(cNum.charAt(0));
      cWords += aTens[nNum - 2];
      num %= 10;
      if (num > 0){
    	  cWords += " ";
    	  }
   }
   if (num > 0) {
      /* Ones and teens. */
      nNum = Math.floor(num);
      cWords += aOnes[nNum];
   }
   return cWords;
}
function ConvertToWords(num)
{
   var nLeft = Math.floor(num);
   for (var i = 0; nLeft > 0; i++) { 
             cWords = ConvertToTens(nLeft);
       nLeft = Math.floor(nLeft / 1000);
   }
   num = Math.round(num * 100) % 100;
   if (num > 0)
      cWords += ConvertToHundreds(num);
   else
      cWords += "";
   return cWords;
}

function watch() {
    'use strict';

    //Import the current time
    //noinspection JSUnusedAssignment
    var date = getDate(),
	    hours = date.getHours(),
	    minutes = date.getMinutes(),
	    seconds = date.getSeconds(),
	    hour = hours + minutes / 60,
	    minute = minutes + seconds / 60,
	    nextMove = 60000 - date.getMilliseconds();

    var box = document.querySelector('#textbox');
    var newTime = ConvertToWords(hours) + "<br/>" +
    			sWords[Math.floor(Math.random()*sWords.length)] + "<br/>" +
    			ConvertToWords(minutes);
    box.innerHTML = newTime;
    
    
    setTimeout(function () {
        window.requestAnimationFrame(watch);
    }, nextMove);
}

window.onload = function () {
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName === "back"){
        	try {
                tizen.application.getCurrentApplication().exit();
            } catch (err) {
                console.error('Error: ', err.message);
            }
    }});

    // Sample code
    //var textbox = document.querySelector('.contents');
    //textbox.addEventListener("click", function(){
    //	box = document.querySelector('#textbox');
    //	box.innerHTML = box.innerHTML == "Basic" ? "Fuck" : "Motherfuckers";
    //});
    window.requestAnimationFrame(watch);
};
