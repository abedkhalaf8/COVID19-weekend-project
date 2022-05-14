document.querySelector("#btn1").disabled = true;
document.querySelector("#btn2").disabled = true;
document.querySelector("#btn3").disabled = true;
document.querySelector("#btn4").disabled = true;
 
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
             document.querySelector("#btn1").disabled = false;
             document.querySelector("#btn2").disabled = false;
             document.querySelector("#btn3").disabled = false;
             document.querySelector("#btn4").disabled = false;
             document.querySelector('#countries').options.length = 0;
             let counties;
             counties = event.target.value;
             console.log(counties);
             const arrayOfCount = [];
             countryOptions.innerHTML += "<option disabled selected value> -- select a country -- </option>"
             for (let i = 0; i < data.length; i++) {
               if(data[i].region === counties){
                arrayOfCount.push(data[i].cca2);
                countryOptions.innerHTML += `<option id='new-country' value='${data[i].cca2}'>${data[i].name.common}</option>`;
           }
           if("World" === counties){
            arrayOfCount.push(data[i].cca2);
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
            //   label: '# of Votes',
              data: btnData,
              backgroundColor: random_rgba(btnData.length),
              borderColor: 
                random_rgba(btnData.length),
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
// console.log(res.data[0].latest_data.confirmed)
for (let i = 0; i < res.data.length; i++) {
    for (let j = 0; j < arrayOfCount.length; j++) {
        if (arrayOfCount[j] === res.data[i].code){
            arr1.push(res.data[i].latest_data.confirmed);
            arr2.push(res.data[i].name)
            arr3.push(res.data[i].latest_data.deaths)
            arr4.push(res.data[i].latest_data.recovered);
            arr5.push(res.data[i].latest_data.critical);
        }   
    }
}
// c
// console.log("arr2",arr2);
// console.log("arr3",arr3);
// console.log("arr4",arr4);
// console.log("arr5",arr5);
btn1.addEventListener('click', ()=> {
    chart(arr2, arr1);
  })
btn2.addEventListener('click', ()=> {
    chart(arr2, arr3);

  })
btn3.addEventListener('click', ()=> {
    chart(arr2, arr4);

  })
btn4.addEventListener('click', ()=> {
    chart(arr2, arr5);

  })
})
};

// generate random colors for chartJS Graph
function random_rgba(numOfcolors) {
    let arrOfcolors = [];
    let o = Math.round, r = Math.random, s = 255;
    for(let i=0; i<numOfcolors; i++){
        arrOfcolors.push('rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')');
    }
    return arrOfcolors;
}

