import './style.css';
import { fetchData } from './fetch.js';

const bt1 = document.querySelector('.get_entry');
bt1.addEventListener('click', async () => {
  console.log('Klikki toimii');
  const url = 'http://localhost:3000/api/entries/1';

  fetchData(url).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    console.log(data);
  });

  // # Get entries by id
  // # GET http://localhost:3000/api/entries/:id
});

// Haetaan kaikki käyttäjät ja luodaan niistä taulukko
// 1. Hae ensin nappula ja kutsu funktiota (keksi nimi)

const allButton = document.querySelector('.get_users');
allButton.addEventListener('click', getUsers);

async function getUsers() {
  console.log('Haetaa kaikki käyttäjät');
  const url = 'http://127.0.0.1:3000/api/users';
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };

  fetchData(url, options).then((data) => {
    createTable(data);
  });

  // vaihtoehtoinen tapa
  // try {
  //   const responseData = await fetchData(url, options);
  //   console.log(responseData);
  // } catch (error) {
  //   console.error(error);
  // }
}

function createTable(data) {
  console.log(data);

  // etitään tbody elementti
  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';

  // loopissa luodaan jokaiselle tietoriville oikeat elementit
  // elementtien sisään pistetään oikeat tiedot

  data.forEach((rivi) => {
    console.log(rivi.user_id, rivi.username, rivi.user_level);

    // Luodaan jokaiselle riville ensin TR elementti alkuun
    const tr = document.createElement('tr');

    // Luodaan soluja mihihin tiedot
    const td1 = document.createElement('td');
    td1.innerText = rivi.username;

    // Luodaan soluja mihihin tiedot
    const td2 = document.createElement('td');
    td2.innerText = rivi.user_level;

    // <td><button class="check" data-id="2">Info</button></td>
    // const td3 = document.createElement('td');
    //td3.innerHTML = `<button class="check" data-id="${rivi.user_id}">Info</button>`;

    const td3 = document.createElement('td');
    const button1 = document.createElement('button');
    button1.className = 'check';
    button1.setAttribute('data-id', rivi.user_id);
    button1.innerText = 'Info';
    td3.appendChild(button1);

    button1.addEventListener('click', getUser);

    // td4
    const td4 = document.createElement('td');
    const button2 = document.createElement('button');
    button2.className = 'del';
    button2.setAttribute('data-id', rivi.user_id);
    button2.innerText = 'Delete';
    td4.appendChild(button2);

    // 2. Lisää kuuntelija kun taulukko on tehty
    button2.addEventListener('click', deleteUser);

    // td5
    var td5 = document.createElement('td');
    td5.innerText = rivi.user_id;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);
  });
}

// Haetaan dialogi yksittäisille tiedoille
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
const dialog = document.querySelector('.info_dialog');
const closeButton = document.querySelector('.info_dialog button');
// "Close" button closes the dialog
closeButton.addEventListener('click', () => {
  dialog.close();
});

async function getUser(evt) {
  // haetaan data-attribuutin avulla id, tämä nopea tapa
  const id = evt.target.attributes['data-id'].value;
  console.log('Getting individual data for ID:', id);
  const url = `http://127.0.0.1:3000/api/users/${id}`;
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    // Avaa modaali
    dialog.showModal();
    console.log('in modal');
    dialog.querySelector('p').innerHTML = `
          <div>User ID: <span>${data.user_id}</span></div>
          <div>User Name: <span>${data.username}</span></div>
          <div>Email: <span>${data.email}</span></div>
          <div>Role: <span>${data.user_level}</span></div>
    `;
  });
}

async function deleteUser(evt) {
  console.log('Deletoit tietoa');
  console.log(evt);

  // Tapa 1, haetaan arvo tutkimalla eventtiä
  const id = evt.target.attributes['data-id'].value;
  console.log(id);

  // Tapa 2 haetaan "viereinen elementti"
  const id2 = evt.target.parentElement.nextElementSibling.textContent;
  console.log('Toinen tapa: ', id2);

  // <tr>
  //   <td>Melissa</td>
  //   <td>5150</td>
  //   <td><button class="check" data-id="2">Info</button></td>
  //   <td><button class="del" data-id="2">Delete</button></td>
  //   <td>2</td>
  // </tr>

  const url = `http://127.0.0.1:3000/api/users/${id}`;
  let token = localStorage.getItem('token');
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };

  const answer = confirm(`Oletko varma että haluat poistaa käyttäjän ID: ${id} `);
  if (answer) {
    fetchData(url, options).then((data) => {
      console.log(data);
      getUsers();
    });
  }
}

async function showUserName() {
  console.log('Hei täällä ollaan! Nyt pitäisi hakea käyttäjän tiedot');

  // hae käyttäjän omat tiedot
  // 1. joko lokal storagesta jos on tallessa
  //let name = localStorage.getItem('name');

  // hae elementti johon printtaat tiedot
  //console.log('Nimesi on:', name);
  //document.getElementById('name').innerHTML = name;

  // 2. hae uudestaan /api/auth/me endpointin kautta

  const url = 'http://localhost:3000/api/auth/me';
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    document.getElementById('name').innerHTML = data.user.username;
    // muita hakuja ja tietoja sivulle, kuten email ym. mitä halutaan näyttää
  });
}

// logataan ulos kjun painetaan logout nappulaa

document.querySelector('.logout').addEventListener('click', logOut);

function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem('token');
  console.log('logginout');
  window.location.href = 'index.html';
}

showUserName();
