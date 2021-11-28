const close = document.querySelector('.close');
const popup = document.querySelector('.popup');
const form = document.querySelector('.form-search');
let input = document.getElementById('beername');
let baseUrl = 'https://api.punkapi.com/v2/beers';

close.addEventListener('click', function () {
  popup.classList.remove('popup-visible');
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (input.value.length > 0) {
    // console.log(input.value);
    let url = `${baseUrl}?beer_name=${input.value}`;
    let html;
    // console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);
        html = data.map(function (el) {
          return `
     <div data-id=${el.id} class="result-item">
      <img class="result-img" src="${el.image_url}" alt="">
      <h4 class="result-name"> ${el.name}</h4>
    </div>
     `;
        });
        document.querySelector('.results').innerHTML = html.join('');
        let results = document.querySelectorAll('.result-item');

        results.forEach(function (result) {
          result.addEventListener('click', function () {
            popup.classList.add('popup-visible');
            console.log(result.getAttribute('data-id'));
            fetch(`${baseUrl}/${result.getAttribute('data-id')}`)
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data[0].name);
                let popup = `
                <img class="detail-img" src="${data[0].image_url}" alt="">
                <h4 class="detail-name">${data[0].name}</h4>
                <p class="detail-desc">
                ${data[0].description}
                </p>
                  `;
                document.querySelector('.popup-content').innerHTML = popup;
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          });
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
});
