Fancybox.bind("[data-fancybox]", {});
gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", function () {
   
    // BURGER (1 раз!)
    const burger = document.getElementById('burgerBtn');
    const menu = document.getElementById('mobileMenu');
    const body = document.body;

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });


    function marquee(trackId, direction = "left", speed = 0.6) {
        const track = document.getElementById(trackId);
        if (!track) return;
    
        // Получаем первую группу
        const firstGroup = track.querySelector(".marquee-group");
        if (!firstGroup) return;
    
        // Функция клонирования групп, пока не хватит на 2 экрана
        function fillClones() {
            // Очищаем трек, оставляя только первую группу
            while (track.children.length > 1) {
                track.removeChild(track.lastChild);
            }
    
            const screenWidth = window.innerWidth;
            let currentWidth = track.scrollWidth;
    
            // Добавляем клоны, пока ширина не станет больше экрана × 2
            while (currentWidth < screenWidth * 3) {
                const clone = firstGroup.cloneNode(true);
                track.appendChild(clone);
                currentWidth += clone.offsetWidth;
            }
        }
    
        fillClones();
    
        let offset = 0;
        const totalWidth = track.scrollWidth / 2; // Половина ширины для сброса
    
        function animate() {
            if (direction === "left") {
                offset -= speed;
                if (Math.abs(offset) >= totalWidth) {
                    offset = 0;
                }
            } else {
                offset += speed;
                if (offset >= totalWidth) {
                    offset = 0;
                }
            }
    
            track.style.transform = `translate3d(${offset}px, 0, 0)`;
            requestAnimationFrame(animate);
        }
    
        animate();
    
        // Пересчёт при изменении размера окна
        window.addEventListener("resize", () => {
            fillClones();
            offset = 0;
            track.style.transform = `translate3d(0, 0, 0)`;
        });
    }
    
    // Запуск
    marquee("marqueeTrack", "left", 0.6);
    marquee("marqueeTrackRev", "left", 0.6);


    const select = document.getElementById("customSelect");
    const head = select.querySelector(".select-head");
    const items = select.querySelectorAll(".select-item");

    head.addEventListener("click", () => {
        select.classList.toggle("active");
    });

    items.forEach(item => {
        item.addEventListener("click", () => {
        head.textContent = item.textContent;
        select.classList.remove("active");
        });
    });

    document.addEventListener("click", (e) => {
        if (!select.contains(e.target)) {
        select.classList.remove("active");
        }
    });



    // ScrollTrigger.matchMedia({

    //     "(min-width: 991px)": function () {
      
    //       const items = gsap.utils.toArray(".item");
    //       const list = document.querySelector(".scroll-list");
      
    //       if (!items.length || !list) return;
      
    //       const step = items[0].offsetHeight + 18;
    //       const total = step * (items.length - 1);
      
    //       let lastIndex = -1; // ✅ ВНЕ scrollTrigger
      
    //       gsap.to(list, {
    //         y: -total,
    //         ease: "none",
      
    //         scrollTrigger: {
    //           trigger: ".scroll-section",
    //           start: "top top",
    //           end: () => "+=" + (total * 2.5),
    //           scrub: 1.5,
    //           pin: true,
    //           anticipatePin: 1,
    //           invalidateOnRefresh: true,
      
    //           onUpdate: (self) => {
      
    //             const raw = self.progress * (items.length - 1);
    //             const threshold = 0.25;
      
    //             let index = Math.floor(raw + threshold);
    //             index = Math.min(items.length - 1, index);
      
    //             if (index !== lastIndex) {
      
    //               items.forEach(el => el.classList.remove("active"));
    //               items[index]?.classList.add("active");
      
    //               lastIndex = index;
    //             }
    //           }
    //         }
      
    //       });
      
    //     }
      
    //   });
    

// const swiper = new Swiper(".wheel", {
//   direction: "vertical",
//   slidesPerView: 2,
//   centeredSlides: true,
//   speed: 600,
//   loop: true,
  
//   mousewheel: false
// });

// ScrollTrigger.create({
//   trigger: ".scroll-section",
//   start: "top top",
//   end: "+=2000", 
//   pin: true,
//   scrub: true,

//   onUpdate: (self) => {
//     const progress = self.progress;

//     // двигаем swiper вручную
//     const max = swiper.slides.length - 1;
//     const index = Math.round(progress * max);

//     swiper.slideTo(index);
//   }
// });

const track = document.querySelector(".track");

const ITEM_HEIGHT = 85;
const CENTER_INDEX = 3;

let offset = 0;
let isAnimating = false;

function setActive() {
  const items = document.querySelectorAll(".wheel-item");

  items.forEach(el => el.classList.remove("active"));

  // центр всегда визуальный
  items[CENTER_INDEX]?.classList.add("active");
}

setActive();

function move() {
  if (isAnimating) return;
  isAnimating = true;

  offset++;

  // 🔥 1. двигаем
  track.style.transition = "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)";
  track.style.transform = `translateY(-${offset * ITEM_HEIGHT}px)`;

  // 🔥 2. active сразу (без ожидания DOM)
  setActive();

  // 🔥 3. после завершения — НЕ reset через transition
  setTimeout(() => {

    const first = track.firstElementChild;

    // 🔥 выключаем анимацию ДО изменений
    track.style.transition = "none";

    // 🔥 переносим DOM
    track.appendChild(first);

    // 🔥 возвращаем offset назад БЕЗ визуального скачка
    offset--;

    // 🔥 компенсируем позицию без перехода
    track.style.transform = `translateY(-${offset * ITEM_HEIGHT}px)`;

    isAnimating = false;

  }, 800);
}

setInterval(move, 1800);
});