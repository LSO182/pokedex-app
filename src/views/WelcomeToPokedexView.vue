<template>
  <div class="bg-primary-grey min-vh-100 pt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 d-flex justify-content-center">
          <div class="greet-pika-container position-relative">
            <img
              src="/src/assets/images/pikachu-welcome-img.png"
              class="position-absolute greet-pika"
              alt="Pikachu waving hello"
            />
          </div>
        </div>
        <div class="col-lg-10">
          <h1 class="text-primary-black text-center">Welcome to Pokédex</h1>
          <p class="text-secondary-grey text-center">
            The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in
            the Pokémon world.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.greet-pika-container {
  width: 206px;
  height: 206px;
  background: url('/src/assets/images/bg-pokeball.png') no-repeat center/contain;
}
.greet-pika {
  object-fit: cover;
  top: -59px;
  left: -43px;
  height: 263px;
}
</style>
