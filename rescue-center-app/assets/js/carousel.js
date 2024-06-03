const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".navigation i");
const firstSlideWidth = carousel.querySelector(".slide").offsetWidth + 25;
const carouselChildren = [...carousel.children];
const radioButtons = document.querySelectorAll(".slide-controls .radio");

let slidePerView = 5;

// Clona os slides para criar a ilusão de rolagem infinita
carouselChildren.slice(-slidePerView).reverse().forEach(slide => {
    carousel.insertAdjacentHTML("afterbegin", slide.outerHTML);
});
carouselChildren.slice(0, slidePerView).forEach(slide => {
    carousel.insertAdjacentHTML("beforeend", slide.outerHTML);
});

const next = () => {
    const scrollDistance = firstSlideWidth;
    carousel.scrollLeft += scrollDistance;
    setTimeout(() => {
        infiniteScroll();
        updateRadioButtons();
    }, 300); // Ajuste o tempo conforme necessário para a transição
};

const previous = () => {
    const scrollDistance = -firstSlideWidth;
    carousel.scrollLeft += scrollDistance;
    setTimeout(() => {
        infiniteScroll();
        updateRadioButtons();
    }, 300); // Ajuste o tempo conforme necessário para a transição
};

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.id === "left" ? previous() : next();
    });
});

const infiniteScroll = () => {
    // Verifica se o carrossel está na posição inicial
    if (carousel.scrollLeft <= 0) {
        carousel.classList.add("no-transition");
        // Pula para a posição correspondente ao final dos cartões clonados à direita
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } 
    // Verifica se o carrossel está na posição final
    else if (Math.ceil(carousel.scrollLeft) >= carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        // Pula para a posição correspondente ao início dos cartões clonados à esquerda
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
};

// Atualiza os botões de rádio com base na posição de rolagem
const updateRadioButtons = () => {
    const totalWidth = carousel.scrollWidth - carousel.offsetWidth;
    const scrollPosition = carousel.scrollLeft % (firstSlideWidth * slidePerView);
    const activeIndex = Math.round(scrollPosition / firstSlideWidth);

    radioButtons.forEach((radio, index) => {
        radio.checked = index === activeIndex;
    });
};

// Rola o carrossel para o slide correspondente quando um botão de rádio é clicado
radioButtons.forEach((radio, index) => {
    radio.addEventListener("change", () => {
        const newScrollLeft = firstSlideWidth * (index + slidePerView);
        carousel.scrollLeft = newScrollLeft;
        infiniteScroll(); // Garante que a rolagem infinita seja tratada
        updateRadioButtons(); // Atualiza o estado dos rádios imediatamente
    });
});

carousel.addEventListener("scroll", () => {
    infiniteScroll();
    updateRadioButtons();
});
