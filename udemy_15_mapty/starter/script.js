'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


// let map, mapEvent;

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration) {
        // this.date = ...
        // this.id = ...
        // console.log('------ workout this: ----')
        // console.log(this);
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
}

class Running extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcPace()
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcSpeed();
    }

    calcSpeed() {
        // km/h
        this.speed = this.distance / (this.duration / 60 );
        return this.speed;
    }
}

// const run1 = new Running([39, -12], 5.2, 24, 178)
// const cycle1 = new Cycling([39, -12], 5.2, 95, 599)
// console.log('---------run1, cycle1-------')
// console.log(run1, cycle1);

//////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


// let mapEvent;

class App {
    #map;
    #mapEvent;
    #count;

    constructor() {
        // Get user position
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this))
        // form.addEventListener('change', this._toggleElevationField())
    }
    _getPosition() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function(){
                    alert('不能抓到你的位置')
            });
        }
    }
    _loadMap(position) {
            console.log(position)
            const { latitude } = position.coords;
            const { longitude } = position.coords;
            // // console.log(`https://www.google.com.tw/maps/@${latitude},${longitude}`)
            // // 'coords' is your loaction object
            const coords = [latitude, longitude];
            // console.log(coords)
            // console.log(this)
            this.#map = L.map('map').setView(coords, 13);

            // console.log(map);
            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);

            // Handling clicks on map
            this.#map.on('click', this._showForm.bind(this))
    }
    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    // _toggleElevationField() {
    //     inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    //     inputCadence.closest('.form__row').classList.toggle('form__row--hidden')

    // }
    _newWorkout(e) {

        console.log('_newWorkout')
        
        // const validInputs = (...inputs) =>
        //   inputs.every(inp => Number.isFinite(inp),
        // //   inputs.every(inp => inp > 0)
        //     console.log(inputs)
        //   );
        
        e.preventDefault();


        // Get data from the form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;

        // Check if data is valid

        // If activity running, create running object
        if( type === 'running') {
            const coords = this.coords;
            const cadence = inputCadence.value;
            // if(!validInputs(distance, duration, cadence) || cadence<=0) return alert('Input have to be positive numbers!');
            console.log(coords, cadence)

            Workout = new Running (coords, distance, duration, cadence);
            console.log(Workout)
        }

        // If activity cycling, create cycling object
        if ( type === 'cycling') {
            const elevation = inputElevation.value;
            // if(!validInputs(distance, duration, elevation) || elevation<=0) return alert('Input have to be positive numbers!');

            Workout = new Cycling (0, distance, duration, elevation);
            console.log(Workout)
        }

        // Add  new object to workout array


        // 這邊 this.#mapEvent 還沒賦予值
        const { lat, lng } = this.#mapEvent.latlng;
        // Render workout on map as marker
        L.marker([lat, lng])
        .addTo(this.#map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup',
            })
        )
        .setPopupContent('There')
        .openPopup();

    // Render workout on list

    // Hide form + clear input fields
    inputDistance.value =  inputDuration.value = inputCadence.value = inputElevation.value = '';

    }
}

const app = new App();







