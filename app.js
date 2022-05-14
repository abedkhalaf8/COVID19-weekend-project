        // covid 19 stats api 
async function counties(codeName) {
    let url;
    if (codeName === undefined ) {
         url = 'https://corona-api.com/countries'
    } else {
    url = 'https://corona-api.com/countries/' + codeName;
   }
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
             const arrayOfCount = [];
             countryOptions.innerHTML += "<option disabled selected value> -- select a country -- </option>"
             for (let i = 0; i < data.length; i++) {
               if(data[i].region === counties){
                arrayOfCount.push(data[i].name.common);
                countryOptions.innerHTML += `<option id='new-country' value='${data[i].cca2}'>${data[i].name.common}</option>`;
           }
           if("World" === counties){
            arrayOfCount.push(data[i].name.common);
            countryOptions.innerHTML += `<option id='new-country' value='${data[i].cca2}'>${data[i].name.common}</option>`;
       }
      }
      buttons(arrayOfCount);
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

  function chart(arrayOfCount, btnData) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: arrayOfCount,
          datasets: [{
              label: '# of Votes',
              data: btnData,
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
}



//button function 
function buttons(arrayOfCount) {
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
counties().then((res) => {
const arr1 = [];
const arr2 = [];
const arr3 = [];
const arr4 = [];
const arr5 = [];
for (let i = 0; i < res.data.length; i++) {
    arr5.push(res.data[i].name);
}
console.log(arr5);
btn1.addEventListener('click', ()=> {
    chart(arrayOfCount, res.data.timeline[0].confirmed);
  })
// btn2.addEventListener('click', ()=> {
//     chart(arrayOfCount, btnData);

//   })
// btn3.addEventListener('click', ()=> {
//     chart(arrayOfCount, btnData);

//   })
// btn4.addEventListener('click', ()=> {
//     chart(arrayOfCount, btnData);

//   })
})
};