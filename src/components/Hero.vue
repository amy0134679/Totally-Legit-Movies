<script setup></script>

<template>
  <div class="hero-container">
    <div id="slideshow">
      <div class="slide-wrapper">
        <div class="slide">
          <h1 class="slide-number">Welcome to Totally Legit Movie Site, <br> the ultimate destination for all
        your movie cravings!</h1>
        </div>
        <div class="slide">
          <h1 class="slide-number">Get ready to immerse yourself in a world of
        cinematic wonders <br> as you explore our comprehensive movie website.</h1>
        </div>
        <div class="slide">
          <h1 class="slide-number">Whether you're a die-hard film enthusiast, a casual moviegoer,<br>or just
        looking for a perfect film to unwind, we've got you covered.</h1>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@keyframes slide {
  33% {
    margin-left: 0px;
  }
  66% {
    margin-left: calc(-100vw* 1);
  }
  100% {
    margin-left: calc(-100vw* 2);
  }
}

#slideshow {
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 40px;
}

.slide {
  float: left;
  height: 400px;
  width: 100vw;
}

.slide-wrapper {
  width: calc(2000px * 4);
  animation: slide 15s ease infinite;
}

.slide:nth-child(1) {
  background-image: url('https://i.redd.it/d3h7ofnt73621.png');
}
.slide:nth-child(2) {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('https://www.dga.org/-/media/Images/DGAQ-Article-Images/1401-Winter-2014/W14ShotTo5.ashx?la=en&hash=0D676DD881A5CA08B8A8D7F5247992935349C0FE');
}

.slide:nth-child(3) {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('https://wallpapercave.com/wp/wp8872305.jpg');
}
h1 {
  font-family: 'Archivo Black';  color: white;
  font-size: 30px;
  padding: 2rem;
  width: 100%;
}
</style>
