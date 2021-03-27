var homeBtn = document.querySelector('.btn');
var homeInput = document.querySelector('#text');

var homeSearchInput;
homeBtn.addEventListener('click', function(event) {
    event.preventDefault();

    window.location.href='barlistings.html'
    homeSearchInput = homeInput.value
    getLocation(homeSearchInput); 
//    document.location.href ='barlistings.html';
});
function handleSubmit(){
    const name = document.getElementById('text').value;

    localStorage.setItem("name", name);

    return;
}