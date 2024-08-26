import { fetchGames } from "../../api/productsApi.js";
import { carousel, carouselImages } from "/js/utils/general/constants.js";

export async function initCarouselSlider() {
  const carouselWrapper = document.createElement("div");
  carouselWrapper.className = "carousel-wrapper";

  const apiInfo = await fetchGames();
  const response = apiInfo.data;
  const prodTitle = response[3].title;

  carouselImages.forEach((image) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;

    const overlayDiv = document.createElement("div");
    overlayDiv.classList.add("carouselOverlayDiv");

    const overlayText = document.createElement("p");
    overlayText.classList.add("carouselOverlayTitle");
    overlayText.innerHTML = `NEW RELEASE<br><span>${prodTitle}</span>`;

    overlayDiv.appendChild(overlayText);
    slide.appendChild(overlayDiv);
    slide.appendChild(img);
    carouselWrapper.appendChild(slide);
  });
  carousel.appendChild(carouselWrapper);

  const slides = document.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;
  let currentIndex = 0;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    const offset = -currentIndex * 100;
    carouselWrapper.style.transform = `translateX(${offset}%)`;
  }

  // carouselWrapper.style.width = `${totalSlides * 100}%`;
  // carouselWrapper.style.transition = "transform 1s ease-in-out";
  slides.forEach((slide) => (slide.style.flex = "0 0 100%"));

  carouselWrapper.style.transform = `translateX(0%)`;

  setInterval(nextSlide, 5000);
}
