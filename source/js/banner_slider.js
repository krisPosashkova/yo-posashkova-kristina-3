
// объявляем переменные 
const slider = document.querySelector('.slider_js');
const wrapperSlider = slider.querySelector('.slider-wrapper_js');
const innerSlider = wrapperSlider.querySelector('.slider-inner_js');
const buttonNext = slider.querySelector('.button-next_js');
const buttonBack = slider.querySelector('.button-back_js');
const pagination = slider.querySelector('.slider-pagination_js')

// находим все слайды и делаем массив
const slides = [...document.querySelectorAll('.slider-slide_js')];

// для получения кол-ва слайдов создаем перемнную
const slidesCount = slides.length;

// анимация
const animationDuration = 500;
let timer = null;

let dots = [];

// получает ширину контейнеру
let slideWidth = wrapperSlider.offsetWidth;

// создаем переменную для взаимодействия
let activeSlideIndex = 0;

let position = {x:0};
let checkerMouseDown = false;

wrapperSlider.addEventListener('mousedown', (e) => {
  position.x = e.clientX;
  checkerMouseDown = true;
})

wrapperSlider.addEventListener('mouseup', endMouseEvent);
wrapperSlider.addEventListener('mouseout', endMouseEvent);

function endMouseEvent(e) {
  if (!checkerMouseDown) return;
  checkerMouseDown = false;
  if (position.x > e.clientX) {
    setActiveSlide(activeSlideIndex + 1);
  } else {
    setActiveSlide(activeSlideIndex - 1);
  }
}

window.addEventListener('resize', () => {
  initWidth();
  setActiveSlide(activeSlideIndex, false);
});

createDots();



// пишем функцию, index-это то на что мы хотим поменять наш слайд, порядок начинается с 0

function setActiveSlide(index, withAnimation = true) {
  if ( index < 0 || index >= slidesCount ) return;   /* запрещаем уходить за пределы кол-ва слайдов */
  innerSlider.style.transform = `translateX(${index * slideWidth * (-1)}px)` /* начальный слайд равен 0, */
  
  buttonBack.removeAttribute('disabled');
  buttonNext.removeAttribute('disabled');

  if (withAnimation) {
    clearTimeout(timer);
    innerSlider.style.transition = `transform ${animationDuration}ms`;
    timer = setTimeout(() => {
      innerSlider.style.transition = '';
    }, animationDuration)
  }

  if (index ===0) {
    buttonBack.setAttribute('disabled', '');
  }

  if (index === slidesCount - 1) {
    buttonNext.setAttribute('disabled', '');
  }

  dots[activeSlideIndex].classList.remove('slider__dot_active');
  dots[index].classList.add('slider__dot_active');
  activeSlideIndex = index;
}

initWidth();
setActiveSlide(0);

function initWidth() {
  slideWidth = wrapperSlider.offsetWidth;

  slides.forEach(slide => {
    slide.style.width = `${slideWidth}px`;
  })
}

buttonNext.addEventListener('click', () => {
  setActiveSlide(activeSlideIndex + 1);
})

buttonBack.addEventListener('click', () => {
  setActiveSlide(activeSlideIndex -1);
})

// создание всех точек 

function createDots() {
  for(let i = 0; i < slidesCount; i++) {
    const dot = createDot(i);
    dots.push(dot);
    pagination.insertAdjacentElement('beforeend', dot);
  }
}

// cоздание точки
function createDot(index) {
  const dot = document.createElement('button');
  dot.classList.add('slider__dot');

  if ( index === activeSlideIndex) {
    dot.classList.add('slider__dot_active');
  }

  dot.addEventListener('click', () => {
    setActiveSlide(index);
  })

  return dot;
}

