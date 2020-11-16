var $messages = $('.messages-content');

var suggession;
var synth = window.speechSynthesis;

try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
}
catch(e) {
    //console.error(e);
    $('.no-browser-support').show();
}

if(typeof recognition !== 'undefined'){
    $('#start-record-btn').on('click', function(e) {
        recognition.start();
    });
    
    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        document.getElementById("message").value= speechToText;
        console.log(speechToText)
        insertMessage();
    }
}

function listendom(no){
    console.log(no)
    //console.log(document.getElementById(no))
    document.getElementById("message").value = no.innerHTML;
    insertMessage();
}

$(window).load(function() {    
    
    serverMessage("Hola, soy GodialogInq, y te atenderé para que puedas obtener el mejor préstamo y en menor tiempo.");
    
    setTimeout(function() {
        serverMessage("¿Indicanos en que podemos ayudarte?");
    }, 3000);

});

function updateScrollbar() {
    autoScroll(".messages");
}

function insertMessage() {
    msg = $('.message-input').val();

    if ($.trim(msg) == '') { return false; }

    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.messages-content')).addClass('new');
    fetchmsg();
  
    $('.message-input').val(null);
    updateScrollbar();

}

document.getElementById("mymsg").onsubmit = (e) => {
    e.preventDefault() 
    insertMessage();
    //serverMessage("hello");
    msg = $('.message-input').val();
    speechSynthesis.speak( new SpeechSynthesisUtterance(msg))
}

function serverMessage(response2) {

    console.log(response2);

    if ($('.message-input').val() != '') {
        return false;
    }
    $('<div class="message loading new"><span></span></div>').appendTo($('.messages-content'));
    updateScrollbar();

    var finalMessage = "";
    
    if (typeof response2 === 'object') {
        response2.forEach(element => {
            finalMessage += element.text.text[0] + "\n";
        });
    } else {
        finalMessage = response2;
    }

    setTimeout(function() {
        $('.message.loading').remove();
        $('<div class="message new">' + finalMessage + '</div>').appendTo($('.messages-content')).addClass('new');
        updateScrollbar();
        speechSynthesis.speak( new SpeechSynthesisUtterance(finalMessage));
    }, 100 + (Math.random() * 20) * 100);

}

function fetchmsg() {

    var url = window.location.protocol + "//" + window.location.host + "/send-message";

    console.log(url);
      
    const data = new URLSearchParams();
    for (const pair of new FormData(document.getElementById("mymsg"))) {
        data.append(pair[0], pair[1]);
        //console.log(pair);
    }    
    //console.log("message: ", data);

    fetch(url, {
        method: 'POST',
        body: data
    }).then(res => res.json())
    .then(response => {
        //console.log(response);
        serverMessage(response.Reply);
        
    })
    .catch(error => console.error('Error h:', error));

}