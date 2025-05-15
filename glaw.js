 document.addEventListener("DOMContentLoaded", function () {
      let links = document.querySelectorAll("#navbar li a");
      let currentUrl = window.location.pathname.split("/").pop(); // Получаем текущий файл
      // Сначала удаляем класс active у всех ссылок
      links.forEach(link => link.classList.remove("active"));
      // Добавляем active только к соответствующей ссылке
      links.forEach(link => {
        if (link.getAttribute("href") === currentUrl) {
          link.classList.add("active");
        }
      });
    });
          const slidesContainer = document.querySelector('.slides');
          const slides = document.querySelectorAll('.slide');
          const prev = document.querySelector('.prev');
          const next = document.querySelector('.next');
          let currentIndex = 0;
          const totalSlides = slides.length;
          // Функция для отображения нужного слайда
          function showSlide(index) {
            if (index >= totalSlides) {
              currentIndex = 0;
            } else if (index < 0) {
              currentIndex = totalSlides - 1;
            } else {
              currentIndex = index;
            }
            slidesContainer.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
          }
          // Автоматическое переключение слайдов каждые 5 секунд
          setInterval(() => {
            showSlide(currentIndex + 1);
          }, 5000);
           // Функционал слайдера: перемещение изображений при движении мыши по контейнеру
    document.querySelectorAll('.image-slider').forEach(slider => {
      slider.addEventListener('mousemove', function(e) {
        const rect = slider.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const totalWidth = slider.offsetWidth;
        const inner = slider.querySelector('.slider-inner');
        const maxTranslate = inner.scrollWidth - totalWidth;
        const percent = offsetX / totalWidth;
        const translateX = -maxTranslate * percent;
        inner.style.transform = `translateX(${translateX}px)`;
        // Для отладки можно раскомментировать:
        // console.log({offsetX, totalWidth, maxTranslate, percent, translateX});
      });
      slider.addEventListener('mouseleave', function() {
        const inner = slider.querySelector('.slider-inner');
        inner.style.transform = 'translateX(0)';
      });
    });
    // Функция для переключения состояния "Избранное"
    function toggleFavorite(btn) {
      btn.classList.toggle('favorited');
      if(btn.classList.contains('favorited')) {
        btn.innerHTML = '&#9829;'; // заполненное сердце
        console.log('Товар добавлен в избранное');
      } else {
        btn.innerHTML = '&#9825;'; // пустое сердце
        console.log('Товар удалён из избранного');
      }
    }
    const fixedBlock = document.querySelector('.filters-price'),
              filters = document.querySelector('.filters'),
              gutter = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gutter')),
              container = document.querySelector('.container'),
              offsetLeft = container.offsetLeft + gutter,
              filtersOffsetTop = filters.offsetTop,
              filtersWidth = filters.offsetWidth,
              smallOffset = gutter;
  const fixedScrollBlock = () => {
      let scrollDistance = window.scrollY;
      if (scrollDistance > (filtersOffsetTop - smallOffset) && scrollDistance <= (filters.offsetHeight + filtersOffsetTop)) {
          fixedBlock.style.left = `${offsetLeft}px`;
          fixedBlock.style.width = `${filtersWidth}px`;
          fixedBlock.classList.remove('absolute');
          fixedBlock.classList.add('fixed');
      } else {
          fixedBlock.style.left = `0px`;
          fixedBlock.style.width = `100%`;
          fixedBlock.classList.remove('fixed');
      }
      if (scrollDistance >= (filtersOffsetTop - smallOffset) + filters.offsetHeight - fixedBlock.offsetHeight) {
          fixedBlock.classList.add('absolute');
          fixedBlock.style.left = `0px`;
          fixedBlock.style.width = `100%`;
          fixedBlock.classList.remove('fixed');
      }
  };
  window.addEventListener('scroll', fixedScrollBlock);
  const products = document.querySelectorAll('.product');
  if (products) {
      products.forEach(el => {
          let currentProduct = el;
          const imageSwitchItems = currentProduct.querySelectorAll('.image-switch__item');
          const imagePagination = currentProduct.querySelector('.image-pagination');
          if (imageSwitchItems.length > 1) {
              imageSwitchItems.forEach((el, index) => {
                  el.setAttribute('data-index', index);
                  imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? 'image-pagination__item--active' : ''}" data-index="${index}"></li>`;
                  el.addEventListener('mouseenter', (e) => {
                      currentProduct.querySelectorAll('.image-pagination__item').forEach(el => {el.classList.remove('image-pagination__item--active')});
                      currentProduct.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('image-pagination__item--active');
                  });
                  el.addEventListener('mouseleave', (e) => {
                      currentProduct.querySelectorAll('.image-pagination__item').forEach(el => {el.classList.remove('image-pagination__item--active')});
                      currentProduct.querySelector(`.image-pagination__item[data-index="0"]`).classList.add('image-pagination__item--active');
                  });
              });
          }
      });
  }
  const showMore = document.querySelector('.show-more');
  const productsLength = document.querySelectorAll('.products-grid__item').length;
  let items = 6;
  showMore.addEventListener('click', () => {
      items += 3;
      const array = Array.from(document.querySelector('.products-grid').children);
      const visItems = array.slice(0, items);
      visItems.forEach(el => el.classList.add('is-visible'));
      if (visItems.length === productsLength) {
          showMore.style.display = 'none';
      }
  });
