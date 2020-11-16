function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function autoScroll(selector) {

    var el = document.querySelector(selector);
    console.log(el);
    el.scrollTop = el.scrollHeight;

    /* var scrollAttempts = 0;
    var incrementScrollAttempts = debounce(function() {
        scrollAttempts++;
    });

    var el = document.querySelector(selector);

    el.addEventListener('scroll', incrementScrollAttempts);
    
    var chkReadyState = setInterval(function() {
        if (el) {
            el.scrollTo(0, el.offsetTop);
        }
        if (document.readyState == 'complete' || scrollAttempts > 1) {
            clearInterval(chkReadyState);
            el.removeEventListener('scroll', incrementScrollAttempts, false);
        }
    }, 100); */
};