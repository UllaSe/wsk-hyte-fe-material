export function showJoke(element) {
  // fetch funktio
  async function getJoke() {
    console.log('Moro täällä ollaan');
    try {
      // yritetään haku
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      console.log(response);
      if (!response.ok) throw new Error('Huono haku!!');

      // tämäkin kestää
      const jokes = await response.json();
      console.log(jokes);
      console.log(jokes.value);

      // viedään se Divin sisään sivuille
      document.querySelector('.show_joke').innerHTML = jokes.value;
    } catch (error) {
      // jos virhe niin jotain
      console.log(error);
    }
  }

  console.log(element);
  element.addEventListener('click', () => getJoke());
}
