'use strict';
console.log('the script starts');

function synchronousFunction() {
  let number = 1;
  for (let i = 1; i < 10000; i++) {
    number += i;
    console.log('synchronousFunction running');
  }
  console.log('regular function complete', number);
}

function synchronousFunction2() {
  console.log('Huh vihdoin täällä!!!!!!!!!!');
}

// suoritetaan async

async function asynchronousFunction() {
  console.log('Async haku alkaa');

  // fetch(URL, {options})
  // haetaan ensin ilman async/await rakennetta perinteisesti käyttäen .then notaatiota

  fetch('https://reqres.in/api/users?page=2')
    .then((response) => {
      // tee jotain vastaukselle
      console.log('Vastaus:');
      // console.log(response);

      if (!response.ok) {
        throw new Error('Verkkovastaus ei ollut kunnossa');
      }
      // muunna json muotoon
      return response.json();
    })
    .then((data) => {
      // tee jotain datan kanssa
      console.log(data);
    })
    .catch((error) => {
      // virhetilanteiden käsittely
      console.error('Fetch-operaatiossa ilmeni ongelma:', error);
    });
}

async function asynchronousFunction2() {
  // nyt haetaan käyttäen yksinkertaisempaa async/await muotoa
  // sisältää myös yleisesti try, catch rakenteen
  try {
    const response = await fetch('https://reqres.in/api/users?page=2');

    // parsee eli muuttaa vastauksen json muotoon. Tämäkin kestää, siksi async.
    const vastausdata = await response.json();

    console.log(vastausdata);
    console.log(vastausdata.per_page);
    console.log(vastausdata.total_pages);
    console.log(vastausdata.data[0].email);
  } catch (error) {
    console.error('Virhe:', error);
  }
}

async function getFromOwnApi() {
  console.log('Haen omaa dataa');
  try {
    const response = await fetch('http://127.0.0.1:3000/items');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    const vastausdata = await response.json();
    console.log(vastausdata);
  } catch (error) {
    console.error('Virhe:', error);
  }
}

async function postToOwnApi() {
  console.log('Postaan omaa dataa');

  // fetch(URL, {options})

  try {
    const response = await fetch('http://127.0.0.1:3000/items', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Yeeee uusi nimi',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    const vastausdata = await response.json();
    console.log(vastausdata);
  } catch (error) {
    console.error('Virhe:', error);
  }
}

asynchronousFunction();
asynchronousFunction2();

async function main() {
  try {
    await getFromOwnApi();
    await postToOwnApi();
    await getFromOwnApi();
  } catch (error) {
    console.log('Virhe');
  }
}
main();

//synchronousFunction();
//synchronousFunction2();
