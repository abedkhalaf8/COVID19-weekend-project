// covid 19 stats api 
async function counties() {
const res = await fetch('https://corona-api.com/countries');
 const data = await res.json();
 return data;
}
counties().then((data) => {
    console.log(data);

})

async function nameOfCountries(){
   let res = await fetch('https://restcountries.herokuapp.com/api/v1');
   const data = await res.json();
   return data;
}
nameOfCountries().then((data) => {
    const countryOptions = document.querySelector('#countries');
    const continentsSelector = document.querySelector('#continents');
        continentsSelector.addEventListener('change', (event) => {
             document.querySelector('#countries').options.length = 0;
             let counties;
             counties = event.target.value;
             console.log(counties);
             for (let i = 0; i < data.length; i++) {
               if(data[i].region === counties){
               countryOptions.innerHTML += `<option id='new-country' value='$'>${data[i].name.common}</option>`;
           }
           }
     });
}); 


 const ctx = document.getElementById('myChart').getContext('2d');
 const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
                