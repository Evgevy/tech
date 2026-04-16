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
    

    if(select) {
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
    }
   

    



    const track = document.querySelector(".track");

    if (track) {

        const ITEM_HEIGHT = 85;
    const CENTER_INDEX = 3;

    let offset = 0;
    let isAnimating = false;

    function setActive() {
    const items = document.querySelectorAll(".wheel-item");

    items.forEach(el => el.classList.remove("active"));

    items[CENTER_INDEX]?.classList.add("active");
    }

    setActive();

    function move() {
    if (isAnimating) return;
    isAnimating = true;

    offset++;

    track.style.transition = "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)";
    track.style.transform = `translateY(-${offset * ITEM_HEIGHT}px)`;

    setActive();

    setTimeout(() => {

        const first = track.firstElementChild;

        track.style.transition = "none";

        track.appendChild(first);

        offset--;

        track.style.transform = `translateY(-${offset * ITEM_HEIGHT}px)`;

        isAnimating = false;

    }, 800);
    }

    setInterval(move, 1800);

    }

    


    let managerSwiper;

    function initManagerSlider() {
        const sliderEl = document.querySelector(".manager-slider");
        if (!sliderEl) return;

        if (window.innerWidth <= 768 && !managerSwiper) {
            managerSwiper = new Swiper(sliderEl, {
                slidesPerView: 1.2,
                spaceBetween: 16,
                speed: 600,
                grabCursor: true,
            });
        }

        if (window.innerWidth > 768 && managerSwiper) {
            managerSwiper.destroy(true, true);
            managerSwiper = null;
        }
    }

    initManagerSlider();

    let resizeTimeout;

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initManagerSlider, 200);
    });


    

    

    // const principleElements = gsap.utils.toArray(".principles-item");
    
    // let state = { index: 0 };
    
    // function render(activeIndex) {
    
    //   principleElements.forEach((el, i) => {
    
    //     // активный ВСЕГДА доезжает в одну и ту же точку (0)
    //     if (i === activeIndex) {
    
    //       gsap.to(el, {
    //         y: 0,
    //         opacity: 1,
    //         scale: 1,
    //         duration: 0.5,
    //         ease: "power2.out"
    //       });
    
    //     }
    
    //     // все предыдущие УХОДЯТ ВВЕРХ (за экран)
    //     else if (i < activeIndex) {
    
    //       gsap.to(el, {
    //         y: -200,   // вверх за границу
    //         opacity: 0,
    //         duration: 0.5,
    //         ease: "power2.out"
    //       });
    
    //     }
    
    //     // следующие пока ждут
    //     else {
    
    //       gsap.to(el, {
    //         y: 0,
    //         opacity: 0.2,
    //         scale: 0.98,
    //         duration: 0.5,
    //         ease: "power2.out"
    //       });
    
    //     }
    
    //   });
    
    // }
    
    // ScrollTrigger.create({
    //   trigger: ".principles",
    //   start: "top top",
    //   end: "+=2500",
    //   pin: true,
    //   scrub: true,
    
    //   onUpdate: (self) => {
    
    //     const index = Math.round(
    //       self.progress * (principleElements.length - 1)
    //     );
    
    //     if (index !== state.index) {
    //       state.index = index;
    //       render(index);
    //     }
    
    //   }
    // });
    
    // render(0);

    

    const mm = gsap.matchMedia();

    // desktop only
    mm.add("(min-width: 1200px)", () => {

    const items = gsap.utils.toArray(".principles-item");

    const STEP = 120;
    const GAP = 40;
    const TOTAL_STEP = STEP + GAP;

    function layout(activeIndex) {

        items.forEach((el, i) => {

        const diff = i - activeIndex;

        let opacity = 0.1;

        if (i === activeIndex) {
            opacity = 1;
        } 
        else if (i === activeIndex + 1) {
            opacity = 0.6;
        } 
        else if (i === activeIndex + 2) {
            opacity = 0.4;
        } 
        else if (i < activeIndex) {
            opacity = 0.1;
        }

        gsap.to(el, {
            y: diff * TOTAL_STEP,
            opacity: opacity,
            scale: i === activeIndex ? 1 : 0.98,
            duration: 0.45,
            ease: "power2.out",
            overwrite: true
        });

        });

    }

    let state = { index: 0 };

    const trigger = ScrollTrigger.create({
        trigger: ".principles",
        start: "top top",
        end: "+=" + (items.length * 800),
        pin: true,
        scrub: true,

        onUpdate: (self) => {

        const index = Math.min(
            items.length - 1,
            Math.floor(self.progress * items.length)
        );

        if (index !== state.index) {
            state.index = index;
            layout(index);
        }

        }
    });

    layout(0);

    // cleanup when breakpoint breaks
    return () => {
        trigger.kill();
    };

    });

    const centerSlider = new Swiper(".center-slider", {
        slidesPerView: "auto",
        spaceBetween: 24,
        loop: true,
        speed: 5000,
        autoplay: {
          delay: 500,
          disableOnInteraction: false
        },
        freeMode: true,
        grabCursor: true,
        breakpoints: {
            300: {
              spaceBetween: 10
            },
            550: {
              spaceBetween: 24
            }
        }
    });

});