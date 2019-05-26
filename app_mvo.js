/********************************************************************************
                                    MODEL
********************************************************************************/

let model = {

    currentKitten: null,
    adminFormVisibility: true,
    kittens: [{
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
            src: 'https://live.staticflickr.com/2406/2177097057_df86bce3f8_b.jpg',
            id: 'kitten04',
            width: 512,
            height: 341,
            alt: 'picture of a kitten',
            numOfClicks: 0
        },
        {
            name: 'Lazydog',
            src: 'https://live.staticflickr.com/1336/579761138_2384373a41_b.jpg',
            id: 'kitten05',
            width: 512,
            height: 341,
            alt: 'picture of a kitten',
            numOfClicks: 0
        }
    ]
};



/********************************************************************************
                                    OCTOPUS
********************************************************************************/

let octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentKitten = model.kittens[0];

        // tell our views to initialize
        kittenDropdownMenuView.init();
        kittenDisplayView.init();
        adminAreaView.init();
    },

    getKittens: function() {
        return model.kittens;
    },

    setCurrentKitten: function(index) {
        console.log(model.kittens[index]);
        model.currentKitten = model.kittens[index];

    },

    incrementClickCounter: function() {
        model.currentKitten.numOfClicks++;
        kittenDisplayView.render();
        adminAreaView.renderForm();
    },

    getCurrentKitten: function() {
        return model.currentKitten;
    },

    toggleFormVisibility: function(isVisible) {
        model.adminFormVisibility = isVisible;
    },

    getFormVisibility: function() {
        return model.adminFormVisibility;
    },

    updateKittenData: function(name, src, numOfClicks) {
        model.currentKitten.name = name;
        model.currentKitten.src = src;
        model.currentKitten.numOfClicks = numOfClicks;
        kittenDisplayView.render();
    }

};



/********************************************************************************
                                    VIEW
********************************************************************************/

let kittenDropdownMenuView = {

    init: function() {

        this.kittenSelector = document.getElementById('kittenSelector');
        this.render();

    },

    render: function() {

        let listOfKittens = octopus.getKittens();

        // populate the dropdown box

        for (const k of listOfKittens) {
            console.log(`<option id="${k.id}">${k.name}</option>`);
            kittenSelector.insertAdjacentHTML('beforeend', `<option id="${k.id}">${k.name}</option>`);
        }


        kittenSelector.addEventListener('change', function() {
            //alert(this.selectedIndex);
            octopus.setCurrentKitten(this.selectedIndex);
            kittenDisplayView.render();
            adminAreaView.renderForm();

        }, false);
    }
};

let kittenDisplayView = {

    init: function() {

        this.kittenShowcaseElem = document.getElementById('kittenShowcase');

        let currentKitten = octopus.getCurrentKitten();

        // clear the possible DOM elements under the kittenShowcase
        if (this.kittenShowcaseElem.hasChildNodes()) {
            while (this.kittenShowcaseElem.firstChild) {
                this.kittenShowcaseElem.removeChild(this.kittenShowcaseElem.firstChild);
            }
        }

        // at init, first kitten is selected by default; build the DOM for the display (kittenShowcase)
        // add children and populate with the data for the selected kitty
        this.kittenShowcaseElem.insertAdjacentHTML('beforeend', `<p><img id='${currentKitten.id}Img' src='${currentKitten.src}' width="${currentKitten.width}" height="${currentKitten.height}" alt="${currentKitten.alt}"></p>`);
        this.kittenShowcaseElem.insertAdjacentHTML('beforeend', `<h4 id='kittyName'>${currentKitten.name}</h4>`);
        this.kittenShowcaseElem.insertAdjacentHTML('beforeend', `<p>Clicked <span id='numOfClicks'>${currentKitten.numOfClicks}</span> times</p>`);

        this.imgElem = document.getElementById(`${currentKitten.id}Img`);
        this.kittyNameElem = document.getElementById('kittyName');
        this.countElem = document.getElementById('numOfClicks');

        this.imgElem.addEventListener('click', function() {
            octopus.incrementClickCounter();
        }, false);

        this.render();

    },

    render: function() {

        let currentKitten = octopus.getCurrentKitten();

        // display kitten name, image and number of clicks for the current kitty 
        this.imgElem.src = currentKitten.src;
        this.kittyNameElem.textContent = currentKitten.name;
        this.countElem.textContent = currentKitten.numOfClicks;
    }
};



let adminAreaView = {

    init: function() {

        this.adminAreaFormElem = document.getElementById('adminAreaForm');

        // hide the form by default
        this.adminAreaFormElem.style.visibility = 'hidden';
        octopus.toggleFormVisibility(false);

        this.adminBtnElem = document.getElementById('adminBtn');
        this.kittyImgUrlInput = document.getElementById('kittyImgUrlInput');
        this.kittyNameInput = document.getElementById('kittyNameInput');
        this.kittyNumOfClicksInput = document.getElementById('kittyNumOfClicksInput');

        // console.log(this.kittyImgInput);

        this.renderAdminBtn();

        //this.renderAdminBtn();
    },

    renderAdminBtn: function() {

        adminAreaView.adminBtnElem.addEventListener('click', function() {
            // TODO: Understand the closures!
            adminAreaView.adminAreaFormElem = document.getElementById('adminAreaForm');

            if (octopus.getFormVisibility() == false) {
                adminAreaView.adminAreaFormElem.style.visibility = 'visible';
                octopus.toggleFormVisibility(true);
                adminAreaView.handleSubmitBtn();
                adminAreaView.renderForm();

            } else {
                adminAreaView.adminAreaFormElem.style.visibility = 'hidden';
                octopus.toggleFormVisibility(false);
            };
        }, false);

    },

    handleSubmitBtn: function() {

        // handle submit for the form
        if (this.adminAreaFormElem.addEventListener) {
            this.adminAreaFormElem.addEventListener('submit', function(e) {
                e.preventDefault(); //stop form from submitting
                octopus.updateKittenData(this.kittyNameInput.value, this.kittyImgUrlInput.value, this.kittyNumOfClicksInput.value);
                octopus.toggleFormVisibility(false);
                adminAreaView.adminAreaFormElem.style.visibility = 'hidden';
                //adminAreaView.renderAdminBtn();

            }); //Modern browsers
        } else if (this.adminAreaFormElem.attachEvent) {
            this.adminAreaFormElem.attachEvent('onsubmit', function(e) {
                e.preventDefault();
                octopus.updateKittenData(this.kittyNameInput.value, this.kittyNumOfClicksInput.value);
                octopus.toggleFormVisibility(false);
                adminAreaView.adminAreaFormElem.style.visibility = 'hidden';
                //adminAreaView.renderAdminBtn();
            });
        }
    },


    renderForm: function() {

        let currentKitten = octopus.getCurrentKitten();

        if (octopus.getFormVisibility() == true) {

            this.kittyNameInput.value = currentKitten.name;
            this.kittyImgUrlInput.value = currentKitten.src;
            this.kittyNumOfClicksInput.value = currentKitten.numOfClicks;
        }
    }
}

octopus.init();