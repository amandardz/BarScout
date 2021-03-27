//Click event to link to the next page
var homeBtn = document.querySelector('.btn');

homeBtn.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href='barlistings.html'
});
