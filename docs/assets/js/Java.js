var searchFormEl = document.querySelector('#search-form');
function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  var queryString = /*add next index here/** */ + searchInputVal + '&format=' + formatInputVal;
  location.replace(queryString);
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// console.log(submit);