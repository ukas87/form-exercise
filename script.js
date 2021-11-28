let results = document.querySelectorAll('.result-img');
const close = document.querySelector('.close');
const popup = document.querySelector('.popup');


results.forEach(function(result) {
  result.addEventListener('click',function() {
    popup.classList.add('popup-visible');
  });
});

close.addEventListener('click', function() {
  popup.classList.remove('popup-visible');
})