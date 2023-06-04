<script setup></script>

<template>
  <div class="footer-container">
    <div class="footer-column">
      <h4>
        Company Info <br />
        Company Name: Totally Legit Movie Site <br />
        Address: 2621 Midland Ave, Scarborough, ON M1S 1R8 <br />
      </h4>
    </div>
    <div class="footer-column">
      <h4>
        Phone: (416) 396-6675 <br />
        Email: info@totallylegitmoviesite.com <br />
      </h4>
    </div>
  </div>
</template>

<style scoped>
.footer-container {
  display: flex;
  justify-content: space-between;
  font-family: "Hind", sans-serif;
  color: white;
  background-color: rgba(252, 210, 235, 0.3);
  filter: blur(20px);
  filter: drop-shadow(-10px 10px 20px #827397);
  height: 130px;
  width: 90vw;
  padding: 30px;
  border-radius: 10px;
  margin: 0 auto; 
}
.footer-column {
  flex-basis: 50%;
}

h4 {
  font-size: 20px;
}
</style>
