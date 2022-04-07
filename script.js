'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
};

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} million people</p>
    // <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    // <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
//https://restcountries.com/v2/
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `<article class="country">
//   <img class="country__img" src="${data.flags.png}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)} million people</p>
//     // <p class="country__row"><span>🗣️</span>${
//       Object.values(data.languages)[0]
//     }</p>
//     // <p class="country__row"><span>💰</span>${
//       Object.values(data.currencies)[0].name
//     }</p>
//   </div>
// </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
/*
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} million people</p>
    // <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    // <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbor = function (country) {
  //ajax call country 1

  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //render country 1
    renderCountry(data);

    //get neighbor country 2
    const [neighbor] = data.borders;
    if (!neighbor) return;

    //ajax call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbor('mexico');

*/

//https://restcountries.com/v2/
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

// const request = fetch(`https://restcountries.com/v3.1/name/usa`);

//promise are a container for a future value
// promises are time sensitive and can hold different states

//pending, settled (fulfilled, rejected)
// const getCountryData = function (count]ry) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, error = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${error} ${response.status}`);
    }
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbor = data[0].borders[0];
//       const neighbor = 'sljfsdf';

//       if (!neighbor) return;

//       //country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err} ***`);
//       renderError('Something went wrong ***');
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      // const neighbor = 'sljfsdf';
      if (!neighbour) throw new Error('No neighbor found!');

      //country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err.message} ***`);
      renderError('Something went wrong ***');
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getCountryData('sdfgjdkf');
/*
function getCurrentPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      whereAmI(pos.coords.latitude, pos.coords.longitude);
    });
  }
}

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Uh ohhh :(');
      }

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.state}`);
      getCountryData(data.adminareas.admin8.is_in_country);
    })
    .catch(err => {
      console.error(err);
    });
};

getCurrentPosition();



console.log('Test start');
setTimeout(() => {
  console.log('0 seconds timer');
}, 0);

Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end');



const lottery = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN! :)');
    } else {
      reject(new Error('I lost my money :('));
    }
  }, 2000);
});

lottery
  .then(resolution => {
    console.log(resolution);
  })
  .catch(err => {
    console.error(err);
  });

//promisifying set timeout
const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 3 seconds total');
  });

Promise.resolve('Resolved value').then(x => {
  console.log(x);
});

Promise.reject('Resolved value').catch(x => {
  console.error(x);
});


const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     resolve(position);
    //   },
    //   err => reject(new Error(err))
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Uh ohhh :(');
      }

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.state}`);
      getCountryData(data.adminareas.admin8.is_in_country);
    })
    .catch(err => {
      console.error(err);
    });
};

btn.addEventListener('click', whereAmI);



const doWithImage = function (img) {
  // return new Promise((resolve, reject) => {
  //   resolve(() => {
  console.log(img);
  const newImg = document.createElement('img');
  newImg.src = img.image;
  const images = document.querySelector('.images');
  images.appendChild(newImg);
  // removeImage(newImg);
};

const removeImage = function (img) {
  setTimeout(() => {
    img.style.opacity = 0;
  }, 2000);
};

const getFoodPics = function () {
  return fetch(`https://foodish-api.herokuapp.com/api/`);
};

getFoodPics()
  .then(
    img => {
      return img.json();
    },
    err => console.error(err)
  )
  .then(doWithImage);


const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};
let currentImg;

createImage(`img/img-1.jpg`)
  .then(img => {
    currentImg = img;
    console.log(`Image 1 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage(`img/img-2.jpg`);
  })
  .then(img => {
    currentImg = img;
    console.log(`Image 1 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => {
    console.error(err);
  });

  

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    //geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    //reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    //country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}. ${dataGeo.country}`;
  } catch (e) {
    console.log(`${e}`);
    renderError(e.message);

    throw e;
  }
};

// console.log('1. Will get location');
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.log(err.message))
//   .finally(() => console.log(`3. All finished lol`));
// console.log('2. finished getting location');

(async function () {
  try {
    const data = await whereAmI();
    console.log(` 1. ${data}`);
  } catch (e) {
    console.log(`2. ${e.message}`);
  }
  console.log('3. finished getting location');
})();
// try {
//   let y = 1;
//   const x = 2;
//   x = y;
// } catch (e) {
//   alert(e.message);
// }



const getThreeCountries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    //promise.all short circuits when a promise is rejected
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (e) {
    console.log(e);
  }
};
getThreeCountries('usa', 'mexico', 'canada');


//Promise.race

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res);
})();

const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request took too long'));
    }, sec);
  });
};

//promise race will return fullfilled or rejected
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(1000),
])
  .then(res => console.log(res[0]))
  .catch(e => console.log(e));

//Promise.allSettled

Promise.allSettled([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(100),
]).then(res => console.log(res));

//Promise.any (ES2021) only returns fulfilled promises
Promise.any([
  Promise.resolve('Done!'),
  Promise.reject('Failed!'),
  Promise.resolve('Done!'),
]).then(res => console.log(res));

*/

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};
let currentImg;

// createImage(`img/img-1.jpg`)
//   .then(img => {
//     currentImg = img;
//     console.log(`Image 1 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage(`img/img-2.jpg`);
//   })
//   .then(img => {
//     currentImg = img;
//     console.log(`Image 1 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => {
//     console.error(err);
//   });

const arr = [`img/img-1.jpg`, `img/img-2.jpg`, `img/img-3.jpg`];
const loadNPause = async function () {
  try {
    //load image1
    let img = await createImage(`img/img-1.jpg`);
    console.log(`Image 1 loaded`);
    await wait(2);
    img.style.display = 'none';
    img = await createImage(`img/img-2.jpg`);
    console.log(`Image 2 loaded`);
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgPaths = await Promise.all(imgs);
    console.log(imgPaths);
    imgPaths.forEach(img => img.classList.add('parallel'));
  } catch (e) {
    console.log(e.message);
  }
};

loadAll(arr);
