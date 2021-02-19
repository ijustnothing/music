const btn = document.querySelector('.artistSearch');
const errPole = document.querySelector('.err')
const elem = document.querySelector('.elem');
const btnSearch = document.querySelector('.musicSearch');
const audioElem = document.querySelector('.audioElem');
const col2 = document.querySelector('.col-2');
const col3 = document.querySelector('.col-3');
const col4 = document.querySelector('.col-4');
let filterMusic = [];
let filterPreview = [];
let count = 0;
let obj = {};
let audioMod = '';

btn.addEventListener('submit', async (e) => {

  obj = {};
  filterMusic = [];
  filterPreview = [];
  setTimeout(() => {
    btnSearch.style.visibility = 'visible';
    col3.style.visibility = 'visible';
    col4.style.visibility = 'visible';
    col3.style.height = 'inherit';
    col2.style.padding = '60px 0';
    col3.style.padding = '60px 0';
  }, 500);
  e.preventDefault();
  const { title } = e.target;
  const responce = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${title.value}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-rapidapi-key': '71fae6aa3emsh204089e761f0434p1f4444jsnf0e728f0adb7',
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        useQueryString: true,
      },
    }
  );
  title.value = ``;
  elem.innerHTML = ``;
  const data = await responce.json();
  console.log(data);
  for (let key in data) {
    const url = data[key][1].artist.picture_big;
    const div = document.createElement('div');
    div.innerHTML = `
        <img class="transform" style="width:350px;border:7px solid #ff75a0;padding:5px;background-color:white;object-fit:cover" src="${url}"/>
    `;
    elem.append(div);
    const transform = document.querySelector('.transform');
    setTimeout(() => {
      transform.style.borderRadius = '50%';
    }, 500);
    filterPreview = data[key].map((el) => el.preview);
    filterMusic = data[key].map((el) => el.title);

    if (count === 0) {
      for (let i = 0; filterMusic.length > i; i++) {
        obj[filterMusic[i]] = filterPreview[i];
      }
    }

    btnSearch.addEventListener('submit', (e) => {
      col4.style.padding = '60px 0';
      audioElem.innerHTML = ``;
      e.preventDefault();
      const { nameSong } = e.target;

      for (let key in obj) {
        if (nameSong.value.toLowerCase() === key.toLowerCase()) {
          audioMod = obj[key];
        }
        console.log(audioMod);
      }
      let err = filterMusic.map((el) => el.toLowerCase());
      if (err.indexOf(nameSong.value.toLowerCase()) == -1) {
        errPole.innerHTML = `Такой песни нет`
      } else {
        errPole.innerHTML = ``
      }
      const div2 = document.createElement('div');
      div2.innerHTML = `
          <audio
          controls
          src="${audioMod}">
          Your browser does not support the
          <code>audio</code> element.
          </audio>`;
      audioElem.append(div2);
    });
  }
});
