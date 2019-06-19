let listOfKittens = [{
        name: 'Beijing',
        src: 'https://live.staticflickr.com/1126/625069434_db86b67df8_b.jpg',
        id: 'kitten01',
        width: 512,
        height: 341,
        alt: 'picture of a kitten',
        numOfClicks: 0
    },
    {
        name: 'Bombai',
        src: 'https://live.staticflickr.com/7291/9387473090_08ef7b756e_b.jpg',
        id: 'kitten02',
        width: 512,
        height: 341,
        alt: 'picture of a kitten',
        numOfClicks: 0
    },
    {
        name: 'Frisco',
        src: 'https://live.staticflickr.com/7036/7074833755_f01f0e8acf_b.jpg',
        id: 'kitten03',
        width: 512,
        height: 341,
        alt: 'picture of a kitten',
        numOfClicks: 0
    },
    {
        name: 'Hopper',
        src: 'https://live.staticflickr.com/1126/625069434_db86b67df8_b.jpg',
        id: 'kitten04',
        width: 512,
        height: 341,
        alt: 'picture of a kitten',
        numOfClicks: 0
    },
    {
        name: 'Lazydog',
        src: 'https://live.staticflickr.com/1126/625069434_db86b67df8_b.jpg',
        id: 'kitten05',
        width: 512,
        height: 341,
        alt: 'picture of a kitten',
        numOfClicks: 0
    }
];


let kittenSelector = document.getElementById('kittenSelector');

for (const k of listOfKittens) {
    console.log(`<option id="${k.id}">${k.name}</option>`);
    kittenSelector.insertAdjacentHTML('beforeend', `<option id="${k.id}">${k.name}</option>`);
}


kittenSelector.addEventListener('change', function() {


    const kittenShowcase = document.getElementById('kittenShowcase');
    const kittyName = document.getElementById('kittyName');

    // alert(this[this.selectedIndex].id);

    for (const k of listOfKittens) {

        if (k.id == this[this.selectedIndex].id) {

            while (kittenShowcase.firstChild) {
                kittenShowcase.removeChild(kittenShowcase.firstChild);
            }

            // add children and populate with the data for the selected kitty
            kittenShowcase.insertAdjacentHTML('beforeend', `<p><img id='${k.id}Img' src='${k.src}' width="${k.width}" height="${k.height}" alt="${k.alt}"></p>`);
            kittenShowcase.insertAdjacentHTML('beforeend', `<h4 id='kittyName'>${k.name}</h4>`);
            kittenShowcase.insertAdjacentHTML('beforeend', `<p>Clicked <span id='numOfClicks'>${k.numOfClicks}</span> times</p>`);

            let imgElem = document.getElementById(`${k.id}Img`);

            imgElem.addEventListener('click', function() {

                let countElem = document.getElementById('numOfClicks');
                let counter = parseInt(countElem.innerText) + 1;
                countElem.innerText = counter;
                k.numOfClicks = counter;

            }, false);
        }
    }


}, false);

