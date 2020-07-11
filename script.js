'use strict';

console.log("js loaded");



function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
  }

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
  
    $('#results-list').empty();
    
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
      $('#results-list').append(
        `<li><h3><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        </li>`);
      }
    $('.results').removeClass('hidden');
  }


function getParks(baseUrl,stateArr,maxResults,apiKey){
    const params = {
        stateCode: stateArr,
        limit: maxResults
    }

    const queryString = formatQueryParams(params);
    const url = baseUrl + '?' + queryString + '&api_key=' + apiKey;

    fetch(url)
        .then(response=>response.json()
        )
        //.then(responseJson => console.log(responseJson)
        .then(responseJson => displayResults(responseJson,maxResults)
        )
        .catch(err => {
            alert("error: " + err.message);
        });
}

function watchForm(){
    $('#js-form').on('submit', function(){
        event.preventDefault();
        const baseUrl =  'https://api.nps.gov/api/v1/parks';
        const stateArr = $('#js-state-entered').val().split(",");
        const maxResults = $('#js-result').val();
        const apiKey = 'dTIzP0G35DeZox3Zz7wLsdSXkU7B9wpufWdgXf4W';
        getParks(baseUrl,stateArr,maxResults,apiKey);
        // console.log(maxResults);
    })
}

$(watchForm);


// https://developer.nps.gov/api/v1/parks?stateCode=ca&limit=10&api_key=dTIzP0G35DeZox3Zz7wLsdSXkU7B9wpufWdgXf4W" -H  "accept: application/json