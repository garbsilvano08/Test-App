/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
function generateDetailsPhone(personDetails){
  document.getElementById('details').style.display = 'block';
  if(window.screen.width >= 1024 ){
    document.getElementById('data').style.display = 'none';
  }else{
    document.getElementById('data').style.display = 'none';
  }
  document.getElementById('details').innerHTML = '';
    const details = document.getElementById('details');
    const closebtn = document.createElement('button');
    closebtn.innerHTML = 'X';
    closebtn.className = 'btn';
    closebtn.onclick = function(){
      document.getElementById('details').innerHTML = '';
      document.getElementById('data').style.display = 'block';
    }
    details.appendChild(closebtn);
    details.style.backgroundColor = '#ece6e6';
    const addressContainer = document.createElement('div');
    addressContainer.className = 'container';
    const addressTitle = document.createElement('h1');
    addressTitle.innerText = 'ADDRESS'
    addressContainer.appendChild(addressTitle);
    const address = document.createElement('p');
    address.className = 'personalDetails'
    address.innerText = `City: ${personDetails.address.city}
                         Street: ${personDetails.address.street}
                         Suite: ${personDetails.address.suite}
                         ZipCode: ${personDetails.address.zipcode}
                         Geo: Latitude: ${personDetails.address.geo.lat}
                              Longtitude: ${personDetails.address.geo.lng}`;
    addressContainer.appendChild(address);

    const companyContainer = document.createElement('div');
    companyContainer.className = 'container';
    const companyTitle = document.createElement('h1');
    companyTitle.innerText = 'COMPANY'
    companyContainer.appendChild(companyTitle);
    const company = document.createElement('p');
    company.className = 'personalDetails'
    company.innerText = `BS: ${personDetails.company.bs}
                         Catch Phrase: ${personDetails.company.catchPhrase}
                         Name: ${personDetails.company.name}`;
    companyContainer.appendChild(company);

    const informationContainer = document.createElement('div');
    informationContainer.className = 'container';
    const informationTitle = document.createElement('h1');
    informationTitle.innerText = 'PERSONAL INFOMATION'
    informationContainer.appendChild(informationTitle);
    const information = document.createElement('p');
    information.className = 'personalDetails'
    information.innerText = `Name: ${personDetails.name}
                            ID: ${personDetails.id}
                            Email: ${personDetails.email}
                            Phone: ${personDetails.phone}
                            Username: ${personDetails.username}
                            Website: ${personDetails.website}`;
    informationContainer.appendChild(information);
    
    details.appendChild(companyContainer);
    details.appendChild(addressContainer);
    details.appendChild(informationContainer);
}
function generateDetailsTab(personDetails){
  document.getElementById('details').innerHTML = '';
    const details = document.getElementById('details');
    details.style.backgroundColor = '#cfcdcd';
    const addressContainer = document.createElement('div');
    addressContainer.className = 'container';
    const addressTitle = document.createElement('h1');
    addressTitle.innerText = 'ADDRESS'
    addressContainer.appendChild(addressTitle);
    const address = document.createElement('p');
    address.className = 'personalDetails'
    address.innerText = `City: ${personDetails.address.city}
                         Street: ${personDetails.address.street}
                         Suite: ${personDetails.address.suite}
                         ZipCode: ${personDetails.address.zipcode}
                         Geo: Latitude: ${personDetails.address.geo.lat}
                              Longtitude: ${personDetails.address.geo.lng}`;
    addressContainer.appendChild(address);

    const companyContainer = document.createElement('div');
    companyContainer.className = 'container';
    const companyTitle = document.createElement('h1');
    companyTitle.innerText = 'COMPANY'
    companyContainer.appendChild(companyTitle);
    const company = document.createElement('p');
    company.className = 'personalDetails'
    company.innerText = `BS: ${personDetails.company.bs}
                         Catch Phrase: ${personDetails.company.catchPhrase}
                         Name: ${personDetails.company.name}`;
    companyContainer.appendChild(company);

    const informationContainer = document.createElement('div');
    informationContainer.className = 'container';
    const informationTitle = document.createElement('h1');
    informationTitle.innerText = 'PERSONAL INFOMATION'
    informationContainer.appendChild(informationTitle);
    const information = document.createElement('p');
    information.className = 'personalDetails'
    information.innerText = `Name: ${personDetails.name}
                            ID: ${personDetails.id}
                            Email: ${personDetails.email}
                            Phone: ${personDetails.phone}
                            Username: ${personDetails.username}
                            Website: ${personDetails.website}`;
    informationContainer.appendChild(information);
    
    details.appendChild(companyContainer);
    details.appendChild(addressContainer);
    details.appendChild(informationContainer);
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    
    const options = {
        method: 'get',
        headers: { Authorization: 'OAuth2: token' }
      };
      let obj = [];
      cordova.plugin.http.sendRequest('https://jsonplaceholder.typicode.com/users', options, function(response) {
        console.log(response.status);
        obj = JSON.parse(response.data);
        obj.forEach((person)=>{
          const personDetails = document.createElement('div'); // is a node
          personDetails.className = 'persons';
          personDetails.innerHTML = person.name;
          personDetails.onclick = function(){
            if(window.screen.width <=1024){
              generateDetailsPhone(person);
            }
            else if(window.screen.width > 1024){  
              this.style.backgroundColor = '#ced6d8';
              this.style.color = '#ffffff';
              generateDetailsTab(person);
            }
          }
          document.getElementById('data').appendChild(personDetails);
        })
      }, function(response) {
        // prints 403
        console.log(response.status);
        console.log(response.error);
      });
}

