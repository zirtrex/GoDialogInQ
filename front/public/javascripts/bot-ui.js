var $messages = $('.messages-content');
//var serverResponse = "wala";

var suggession;
//speech reco
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
        document.getElementById("MSG").value= speechToText;
        console.log(speechToText)
        insertMessage();
    }
}

function listendom(no){
    console.log(no)
    //console.log(document.getElementById(no))
    document.getElementById("MSG").value = no.innerHTML;
    insertMessage();
}

$(window).load(function() {
    $messages.scrollbar();
    setTimeout(function() {
        serverMessage("Hola, soy GoDialogInQ, y te atenderé para que puedas obtener el mejor préstamo y en menor tiempo.");
    }, 100);

});

function updateScrollbar() {
    $messages.scrollbar({
        "onScroll": function(y, x){
            if(y.scroll == y.maxScroll){
                console.log('Scrolled to bottom');
            }
        }
    });
}

function insertMessage() {
    msg = $('.message-input').val();

    if ($.trim(msg) == '') { return false; }

    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.scroll-content')).addClass('new');
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

    if ($('.message-input').val() != '') {
        return false;
    }
    $('<div class="message loading new"><span></span></div>').appendTo($('.scroll-content'));
    updateScrollbar();  

    setTimeout(function() {
        $('.message.loading').remove();
        $('<div class="message new">' + response2 + '</div>').appendTo($('.scroll-content')).addClass('new');
        updateScrollbar();
    }, 100 + (Math.random() * 20) * 100);

}

function fetchmsg(){

    var url = 'http://localhost:8080/send-msg'; 
    //var url = 'https://662dfdc8223a.ngrok.io/send-msg';
      
    const data = new URLSearchParams();
    for (const pair of new FormData(document.getElementById("mymsg"))) {
        data.append(pair[0], pair[1]);
        console.log(pair);
    }    
    console.log("message: ", data);

    fetch(url, {
        method: 'POST',
        body: data
    }).then(res => res.json())
    .then(response => {
        console.log(response);
        serverMessage(response.Reply);
        speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply));
    })
    .catch(error => console.error('Error h:', error));

}