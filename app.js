        // covid 19 stats api 
async function counties(codeName) {
    let url = 'https://corona-api.com/countries/' + codeName;
   const res = await fetch(url);
   const data = await res.json();
   return data;
  }
  
  
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
             countryOptions.innerHTML += "<option disabled selected value> -- select a country -- </option>"
             for (let i = 0; i < data.length; i++) {
               if(data[i].region === counties){
                countryOptions.innerHTML += `<option id='new-country' value='${data[i].cca2}'>${data[i].name.common}</option>`;
           }
           if("World" === counties){
            countryOptions.innerHTML += `<option id='new-country' value='${data[i].cca2}'>${data[i].name.common}</option>`;
       }
           }
     });
}); 
// Display covid stats for specfic country 

const info = document.querySelector(".covidInfo");
const countries = document.querySelector('#countries');
countries.addEventListener('change', (event) => {
   
       counties(event.target.value).then((result) => {
    
            // a table for the covid stats
            let statsTable = '<table>';
             
            // FIRST ROW 
             statsTable = statsTable + '<tr>';
             statsTable = statsTable + '<td id="firstRow">Total Cases</td>';  
             statsTable = statsTable + '<td id="firstRow">new cases</td>';    
             statsTable = statsTable + '<td id="firstRow">total deaths</td>';   
             statsTable = statsTable + '<td id="firstRow">new deaths</td>';   
             statsTable = statsTable + '<td id="firstRow">total recovered</td>';  
             statsTable = statsTable + '<td id="firstRow">in critical condition</td>';   
             statsTable = statsTable + '</tr>';

             // covidSTATS FROM THE API WEBSITE
             statsTable = statsTable + '<tr>';
             statsTable = statsTable + `<td id="secondRow">${result.data.timeline[0].confirmed}</td>`;
             statsTable = statsTable + `<td id="secondRow">${result.data.timeline[0].new_confirmed}</td>`;
             statsTable = statsTable + `<td id="secondRow">${result.data.latest_data.deaths}</td>`;  
             statsTable = statsTable + `<td id="secondRow">${result.data.timeline[0].new_deaths}</td>`; 
             statsTable = statsTable + `<td id="secondRow">${result.data.latest_data.recovered}</td>`; 
             statsTable = statsTable + `<td id="secondRow">${result.data.latest_data.critical}</td>`;  
             statsTable = statsTable + '</tr>';

             // close the table tage
             statsTable = statsTable + '</table>';
             document.querySelector(".covidInfo").innerHTML = statsTable;
        })
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