//Шаров Михаил Романович
const playSlider = () =>{
    let portfolioItems = document.querySelectorAll(".portfolio-item"),
    html = document.querySelector("html"),
    portfolioContent = document.querySelector(".portfolio-content"),
    portfolioDots=document.querySelector(".portfolio-dots"),
    oldDots=portfolioDots.querySelectorAll(".dot"),
    addClass = (items, index, classStyle) => {
        items[index].classList.add(classStyle);
    },
    removeClass = (items, index, classStyle) => {
        items[index].classList.remove(classStyle);
    },
    currentSlideIndex=0;

    //Удаление точек
    for(let i=0;i<oldDots.length;i++){
        oldDots[i].remove();
    };

    //Добавление точек
    for(let i=0;i<portfolioItems.length;i++){
        let newDot = document.createElement("li");
        newDot.classList.add("dot");
        portfolioDots.appendChild(newDot);
    };
    let dots = portfolioDots.querySelectorAll(".dot");
    dots[0].classList.add("dot-active");

    //Анимация
    const animateSlide = () => {
        removeClass(portfolioItems, currentSlideIndex, "portfolio-item-active");
        removeClass(dots,currentSlideIndex,"dot-active");
        currentSlideIndex++;
        if (currentSlideIndex===portfolioItems.length) currentSlideIndex=0;
        addClass(portfolioItems, currentSlideIndex, "portfolio-item-active");
        addClass(dots,currentSlideIndex,"dot-active");
    };
    let idAnimate = setInterval(animateSlide, 3000);

    //Остановка анимации и запуск (Неадекватная работа)
    portfolioContent.addEventListener("mouseover", ()=>{
        clearInterval(idAnimate);
    });
    portfolioContent.addEventListener("mouseleave", ()=>{
        idAnimate = setInterval(animateSlide, 3000);
    });

    //Делегирование (клик)
    html.addEventListener("click", (event) => {
        event.preventDefault();
        let target = event.target;
        if (!target.matches(".portfolio-btn, .dot")) return;
        //Обработка клика по кнопкам
        if (target.matches(".portfolio-btn")){  
            removeClass(portfolioItems, currentSlideIndex, "portfolio-item-active");
            removeClass(dots,currentSlideIndex,"dot-active");
            if (target.matches(".prev")) {
                currentSlideIndex--; if(currentSlideIndex===-1) currentSlideIndex=portfolioItems.length-1;
            }else{
                currentSlideIndex++; if(currentSlideIndex===portfolioItems.length) currentSlideIndex=0;
            };
            addClass(portfolioItems, currentSlideIndex, "portfolio-item-active");
            addClass(dots,currentSlideIndex,"dot-active");
        }//Обработка клика по точкам
        else if (target.matches(".dot") && (!target.matches(".dot-active"))){
            removeClass(portfolioItems, currentSlideIndex, "portfolio-item-active");
            removeClass(dots,currentSlideIndex,"dot-active");
            for (let i=0; i<portfolioItems.length;i++){
                if(dots[i]==target){
                    currentSlideIndex=i;
                    break;
                };
            };
            addClass(portfolioItems, currentSlideIndex, "portfolio-item-active");
            addClass(dots,currentSlideIndex,"dot-active");
        };
    });

};
playSlider();