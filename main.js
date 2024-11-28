const carouselImg = document.getElementById("carousel-inner-img")
let htmlCarouselImg = ''

const carouselVid = document.getElementById("carousel-inner-vid")
let htmlCarouselVid = ''

for(let i = 0; i < 21; i++) {
  htmlCarouselImg += `
  <div class="carousel-item ${i+1 == 1 ? 'active' : ''}">
    <img src="images/moment/${i+1}.jpg" class="d-block w-100" alt="Gambar ${i+1}">
  </div>
  `
}

for(let i = 0; i < 4; i++) {
  htmlCarouselVid += `
  <div class="carousel-item ${i+1 == 1 ? 'active' : ''}">
      <div class="video-wrapper">
          <video id="video${i+1}">
              <source src="videos/moment/${i+1}.mp4">
              Browser Anda tidak mendukung elemen video.
          </video>
      </div>
  </div>
  `
}

carouselImg.innerHTML = htmlCarouselImg
carouselVid.innerHTML = htmlCarouselVid

const typeWaifu = document.getElementById('type-waifu')
const uploadStatus = document.getElementById('image-result')
const btnSubmit = document.getElementById('submit-btn')

function clearImage() {
  uploadStatus.innerHTML = ""
  btnSubmit.disabled = false
}

function generateImage() {
  fetch('https://api.waifu.pics/sfw/' + typeWaifu.value, {
    method: "GET"
  })
  .then(response => response.json())
  .then(data => {
      const src = data.url
      uploadStatus.innerHTML = `
          <img src="${src}" class="img-fluid mb-3" alt="Result Image">
          <button type="button" class="btn btn-success" onclick="generateImage()">Retry</button>
          <button type="button" class="btn btn-danger" onclick="clearImage()">Clear</button>
      `;
      btnSubmit.disabled = true
  })
  .catch(error => {
    console.log(error)
      uploadStatus.innerHTML = `<div class="alert alert-danger">Ada Kesalahan Bro.</div>`;
  });
}

var carousel = document.getElementById('videoCarousel');
carousel.addEventListener('slide.bs.carousel', function (event) {
    var activeVideo = document.querySelector('.carousel-item.active video');
    if (activeVideo) {
        activeVideo.pause();
    }
    
    var nextVideo = event.relatedTarget.querySelector('video');
    if (nextVideo) {
        nextVideo.play();
    }
});

window.addEventListener('load', function() {
    var firstVideo = document.querySelector('.carousel-item.active video');
    if (firstVideo) {
        firstVideo.play();
    }
});