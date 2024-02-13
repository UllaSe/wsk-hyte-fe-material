export function showPics(element) {
  // versio 1, haetaan kissakuvat json tiedostosta
  // ja muokataan index.html tietoja
  async function modifyHTMLPics() {
    console.log('Haetaan kuvat paikallisesta JSON tiedostosta!');

    try {
      // fetch
      const response = await fetch('catpics.json');
      if (!response.ok) throw new Error('Huono haku!!');
      const images = await response.json();

      console.log(images);
      const alt = images[1].name;
      const figurecap = images[1].description;
      const imagesrc = images[1].address;

      // haetaan kuvaelementti html tiedostosta
      const kuva = document.querySelector('img');
      kuva.src = imagesrc;
      kuva.alt = alt;

      // haetaan kuvateksti html tiedostosta
      const kuvateksti = document.querySelector('figcaption');
      kuvateksti.innerText = figurecap;
    } catch (error) {
      console.log(error);
    }
  }

  console.log(element);
  element.addEventListener('click', () => modifyHTMLPics());
}
