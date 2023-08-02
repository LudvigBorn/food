/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
       //Калькулятор каллории
    //BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
    //для женщин: BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)

    let sex, height, weight, age, ratio;

    const result = document.querySelector('.calculating__result span');

    function localInformation() {
        if(localStorage.getItem('ratio')){
            ratio = +localStorage.getItem('ratio');
        } else {
            ratio = 1.375;
            localStorage.setItem('ratio',1.375)
        }

        if(localStorage.getItem('sex')){
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex','female')
        }
    }
    localInformation()

    function initLocalInforation(selector,activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            if(elem.matches('[data-ratio]')){
                if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass)
                    })
                    elem.classList.add(activeClass);
                }
            } else {
                if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);
                    })
                    elem.classList.add(activeClass)
                }
            }

        })
    }

    initLocalInforation('.calculating__choose_big div','calculating__choose-item_active');
    initLocalInforation('#gender div','calculating__choose-item_active')

    calcResult();

    function calcResult() {
        if (!sex || !height || !weight || !age || !ratio){
            result.textContent = "____";
            console.log(sex, height, weight, age, ratio)
            return;
        }
        if (sex === 'male') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))*ratio);
        }else {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))*ratio);
        }
        console.log(sex, height, weight, age, ratio)
    }

    function getStaticInformation(selector,activeClass){

        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio',ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex',sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcResult();

            });
        });

    }

    getStaticInformation('#gender div','calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active')

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none';
            }
            //console.log(typeof(+input.value));

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
            }
            calcResult();
        });

    }

    getDynamicInformation('.calculating__choose_medium input')

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            //this.transfer = transfer;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            //this.transfer = 27;
            //this.toTransfer();
        }

        toTransfer() {
            this.price = this.price * this.transfer[0];
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(className => {
                    element.classList.add(className);
                });
            }

            element.innerHTML =`
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> доллар/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }




    //src, alt, title, descr, price, transfer, parentSelector, ...classes
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResours)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title ,descr ,price}) => { //дестуриктизация - из объекта вытаскиваем отдельные свойства в качестве отдельной переменной
            new MenuCard(img, altimg, title ,descr ,price, '.menu .container').render();
        })
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'All good',
        errork: 'что то пошло не так'
    };

    forms.forEach((item) => {
        bindPostData(item);
    });



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend',statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries())) // *** Узнать что делают эти методы

            ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests",json)
            .then((data) => {
                e.preventDefault()
                console.log(data);
                statusMessage.remove();
                showThanksModal(message.success);
            })
            .catch(() => {
                showThanksModal(message.errork)
            })
            .finally(()=> {
                form.reset();
            })

        })
    }

    // Form Up модалка с благодарностью
    function showThanksModal(message) {
        const preventModal = document.querySelector('.modal__dialog');
        preventModal.classList.add('hide');


        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            preventModal.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        },4000)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector,modalTimer){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden';

    console.log(modalTimer);
    if(modalTimer){
        clearTimeout(modalTimer);
    }
    
}
function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('hide')
    modal.classList.remove('show')

    document.body.style.overflow = '';
}

function modal(triggerSelector,modalSelector,modalTimer) {
    //Modal
    const modal = document.querySelector(modalSelector);
    const modelTrigger = document.querySelectorAll(triggerSelector);


    modelTrigger.forEach((item) => {
        item.addEventListener('click',() => openModal(modalSelector,modalTimer));
    });

    //modelCloser.addEventListener('click', closeModal); // скобки () не нужны при объявление функции здесь

    modal.addEventListener(('click'), (event) => {
        if(event.target.matches('.modal') || event.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }
    });

    modal.addEventListener('keydown',(e)=> {
        if(e.code === 'Escape' && modal.matches('.show')) {
            closeModal(modalSelector);
        }
    })

    //ModalUp

    
    function scrollEventListenr(){
        if(document.documentElement.clientHeight + window.pageYOffset >= document.
            documentElement.scrollHeight){
            // scrollHeight - вся высотае сайта
            // PageYOffset - текущяя высота на котором находится юзер
            // clientHeight - текущяя высота экрана у юзера

            openModal(modalSelector,modalTimer);
            window.removeEventListener('scroll',scrollEventListenr);
        }
        
    }
    addEventListener('scroll', scrollEventListenr);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container,slide,nextArrow, prevArrow, totalCounter,currentCounter,wrapper,field}) {


    function getZero(num){
        if(num >= 0 && num < 10){
            return '0' + num;
        }else {
            return num;
        }
    }
    //sliders version 2
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          sliderWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          widthPx = window.getComputedStyle(sliderWrapper).width,
          width = +widthPx.slice(0,widthPx.length-2),
          nextBtn = document.querySelector(nextArrow),
          prevBtn = document.querySelector(prevArrow);


    let slideIndex = 1;
    //let offset = 0;

    slider.style.position = 'relative';
    const dotsWrapper = document.createElement('ol');
    dotsWrapper.classList.add('dots-wrapper');
    slider.append(dotsWrapper);
    const dots = [];

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to',i+1);
        dots.push(dot);
        dotsWrapper.append(dot);
    }

    dots[0].style.opacity = 1;
    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.classList.add('carusel-anim');


    sliderWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = widthPx; //у каждой картинки ширина теперь ровнятеся ширине рамки
    })

    function showSlide(n){
        console.log('showSlide')
        if(n < 1) {
            slideIndex = slides.length;
        }
        if(n > slides.length) {
            slideIndex = 1;
        }
        slidesField.style.transform = `translateX(-${(slideIndex -1)* width}px)`

        dots.forEach((item) => item.style.opacity = 0.5)
        dots[slideIndex-1].style.opacity = 1;

        current.textContent = getZero(slideIndex);
    }
    function plusSlide(n){
        showSlide(slideIndex+=n);
    }
    nextBtn.addEventListener('click',()=> {
        plusSlide(1);
    })
    prevBtn.addEventListener('click',()=> {
        plusSlide(-1);
    })

    dotsWrapper.addEventListener('click', (event) => {
        const target = event.target;
        const SlideTo = target.getAttribute(`data-slide-to`)
        slideIndex = SlideTo;
        showSlide(slideIndex);
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector,tabsParentSelector, activeClass) {
    //Tabs
    const tabs = document.querySelectorAll(tabsSelector),
          tabsParent = document.querySelector(tabsParentSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector);

    function hideTabsContent() {

        tabsContent.forEach((item) => {
            item.classList.add('hide','fade');
            item.classList.remove('show');
        });

        tabs.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }

    function showTabsContent(i = 0) {
        tabs[i].classList.add(activeClass);
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');
    }
    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click',(event) => {
        const target = event.target;
        if(target && target.matches(tabsSelector)) {
            tabs.forEach((item,i) => {
                if(target === item){
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id,deadline) {

    function getRemainingTime(endtime) {
        let days,hours,minutes,seconds = 0;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if(Date.parse(endtime) > 0) {
            days = Math.floor(t/(1000*60*60*24));
            hours = Math.floor(t/(1000*60*60)%24);
            minutes = Math.floor((t/1000*60)%60);
            seconds = Math.floor((t/1000)%60);
        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }

    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return '0' + num;
        }else {
            return num;
        }
    }

    function getClock(selector,endtime) {
        const timer = document.querySelector(selector);
        
        let days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerId = setInterval(update,1000);
            

        function update() {
            
            let t = getRemainingTime(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                days.innerHTML = getZero(0);
                hours.innerHTML = getZero(0);
                minutes.innerHTML = getZero(0);
                seconds.innerHTML = getZero(0);
                clearInterval(timerId);
            }
        }
    }

    getClock(id,deadline);
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResours": () => (/* binding */ getResours),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url,data) => {
    const res = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: data
    })
    return await res.json();
}

const getResours = async (url) => { // создаю функцию экспрешен асинхронною 
    const res = await fetch(url); // Переменная res, ждем когда в res попадут url и data и функция fetch вернет значени
    if(!res.ok) {
        throw new Error(`Could not fetch ${url} status: ${res.status}`);
    }
    return await res.json(); // Ждет когда res.json() получит файл 
} 




/***/ }),

/***/ "./node_modules/es6-promise-polyfill/promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise-polyfill/promise.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function(global){

//
// Check for native Promise and it has correct interface
//

var NativePromise = global['Promise'];
var nativePromiseSupported =
  NativePromise &&
  // Some of these methods are missing from
  // Firefox/Chrome experimental implementations
  'resolve' in NativePromise &&
  'reject' in NativePromise &&
  'all' in NativePromise &&
  'race' in NativePromise &&
  // Older version of the spec had a resolver object
  // as the arg rather than a function
  (function(){
    var resolve;
    new NativePromise(function(r){ resolve = r; });
    return typeof resolve === 'function';
  })();


//
// export if necessary
//

if ( true && exports)
{
  // node.js
  exports.Promise = nativePromiseSupported ? NativePromise : Promise;
  exports.Polyfill = Promise;
}
else
{
  // AMD
  if (true)
  {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){
      return nativePromiseSupported ? NativePromise : Promise;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  else
  {}
}


//
// Polyfill
//

var PENDING = 'pending';
var SEALED = 'sealed';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
var NOOP = function(){};

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

// async calls
var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
var asyncQueue = [];
var asyncTimer;

function asyncFlush(){
  // run promise callbacks
  for (var i = 0; i < asyncQueue.length; i++)
    asyncQueue[i][0](asyncQueue[i][1]);

  // reset async asyncQueue
  asyncQueue = [];
  asyncTimer = false;
}

function asyncCall(callback, arg){
  asyncQueue.push([callback, arg]);

  if (!asyncTimer)
  {
    asyncTimer = true;
    asyncSetTimer(asyncFlush, 0);
  }
}


function invokeResolver(resolver, promise) {
  function resolvePromise(value) {
    resolve(promise, value);
  }

  function rejectPromise(reason) {
    reject(promise, reason);
  }

  try {
    resolver(resolvePromise, rejectPromise);
  } catch(e) {
    rejectPromise(e);
  }
}

function invokeCallback(subscriber){
  var owner = subscriber.owner;
  var settled = owner.state_;
  var value = owner.data_;  
  var callback = subscriber[settled];
  var promise = subscriber.then;

  if (typeof callback === 'function')
  {
    settled = FULFILLED;
    try {
      value = callback(value);
    } catch(e) {
      reject(promise, e);
    }
  }

  if (!handleThenable(promise, value))
  {
    if (settled === FULFILLED)
      resolve(promise, value);

    if (settled === REJECTED)
      reject(promise, value);
  }
}

function handleThenable(promise, value) {
  var resolved;

  try {
    if (promise === value)
      throw new TypeError('A promises callback cannot return that same promise.');

    if (value && (typeof value === 'function' || typeof value === 'object'))
    {
      var then = value.then;  // then should be retrived only once

      if (typeof then === 'function')
      {
        then.call(value, function(val){
          if (!resolved)
          {
            resolved = true;

            if (value !== val)
              resolve(promise, val);
            else
              fulfill(promise, val);
          }
        }, function(reason){
          if (!resolved)
          {
            resolved = true;

            reject(promise, reason);
          }
        });

        return true;
      }
    }
  } catch (e) {
    if (!resolved)
      reject(promise, e);

    return true;
  }

  return false;
}

function resolve(promise, value){
  if (promise === value || !handleThenable(promise, value))
    fulfill(promise, value);
}

function fulfill(promise, value){
  if (promise.state_ === PENDING)
  {
    promise.state_ = SEALED;
    promise.data_ = value;

    asyncCall(publishFulfillment, promise);
  }
}

function reject(promise, reason){
  if (promise.state_ === PENDING)
  {
    promise.state_ = SEALED;
    promise.data_ = reason;

    asyncCall(publishRejection, promise);
  }
}

function publish(promise) {
  var callbacks = promise.then_;
  promise.then_ = undefined;

  for (var i = 0; i < callbacks.length; i++) {
    invokeCallback(callbacks[i]);
  }
}

function publishFulfillment(promise){
  promise.state_ = FULFILLED;
  publish(promise);
}

function publishRejection(promise){
  promise.state_ = REJECTED;
  publish(promise);
}

/**
* @class
*/
function Promise(resolver){
  if (typeof resolver !== 'function')
    throw new TypeError('Promise constructor takes a function argument');

  if (this instanceof Promise === false)
    throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');

  this.then_ = [];

  invokeResolver(resolver, this);
}

Promise.prototype = {
  constructor: Promise,

  state_: PENDING,
  then_: null,
  data_: undefined,

  then: function(onFulfillment, onRejection){
    var subscriber = {
      owner: this,
      then: new this.constructor(NOOP),
      fulfilled: onFulfillment,
      rejected: onRejection
    };

    if (this.state_ === FULFILLED || this.state_ === REJECTED)
    {
      // already resolved, call callback async
      asyncCall(invokeCallback, subscriber);
    }
    else
    {
      // subscribe
      this.then_.push(subscriber);
    }

    return subscriber.then;
  },

  'catch': function(onRejection) {
    return this.then(null, onRejection);
  }
};

Promise.all = function(promises){
  var Class = this;

  if (!isArray(promises))
    throw new TypeError('You must pass an array to Promise.all().');

  return new Class(function(resolve, reject){
    var results = [];
    var remaining = 0;

    function resolver(index){
      remaining++;
      return function(value){
        results[index] = value;
        if (!--remaining)
          resolve(results);
      };
    }

    for (var i = 0, promise; i < promises.length; i++)
    {
      promise = promises[i];

      if (promise && typeof promise.then === 'function')
        promise.then(resolver(i), reject);
      else
        results[i] = promise;
    }

    if (!remaining)
      resolve(results);
  });
};

Promise.race = function(promises){
  var Class = this;

  if (!isArray(promises))
    throw new TypeError('You must pass an array to Promise.race().');

  return new Class(function(resolve, reject) {
    for (var i = 0, promise; i < promises.length; i++)
    {
      promise = promises[i];

      if (promise && typeof promise.then === 'function')
        promise.then(resolve, reject);
      else
        resolve(promise);
    }
  });
};

Promise.resolve = function(value){
  var Class = this;

  if (value && typeof value === 'object' && value.constructor === Class)
    return value;

  return new Class(function(resolve){
    resolve(value);
  });
};

Promise.reject = function(reason){
  var Class = this;

  return new Class(function(resolve, reject){
    reject(reason);
  });
};

})(typeof window != 'undefined' ? window : typeof __webpack_require__.g != 'undefined' ? __webpack_require__.g : typeof self != 'undefined' ? self : this);


/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (() => {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
// comandJS
//exports.module = /exmple{ car }/;
// window.addEventListener('DOMContentLoaded', () => {
//     const tabs = require('./modules/tabs'),
//           modal = require('./modules/modal'),
//           timer = require('./modules/timer'),
//           cards = require('./modules/cards'),
//           calc = require('./modules/calc'),
//           forms = require('./modules/forms'),
//           slider = require('./modules/slider');
//     tabs();
//     modal();
//     timer();
//     cards();
//     calc();
//     forms();
//     slider();
// });
__webpack_require__(/*! es6-promise-polyfill */ "./node_modules/es6-promise-polyfill/promise.js")
;










window.addEventListener('DOMContentLoaded', () => {

    const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal',modalTimer),300000);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]','.modal', modalTimer);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer','2023-09-12');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])('form');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_7__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        field: '.offer__slider-inner',
        wrapper: '.offer__slider-wrapper'
    });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
