<template>
  <div id="app" :class="{ ready: isPageReady }">
    <div class="container">
      <creative-list></creative-list>
    </div>
  </div>
</template>

<script>
import CreativeList from "./components/CreativeList.vue";
export default {
  components: {
    creativeList: CreativeList,
  },
  data() {
    return {
      isPageReady: false,
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.isPageReady = true;
      }, 0);
    });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");
$primary-color: #1f2734;
$secondary-color: #fcaf19;
$tertiary-color: #3388ff;

$nav-color: #3e4a5e;
$default-color: #e5e5e5;

$default-font: "Roboto", sans-serif;
html {
  height: 100%;
}
body {
  height: 100%;
  background-color: $primary-color;
  font-family: $default-font;
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 18px;
  font-style: normal;
  font-weight: normal;
  color: $default-color;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
  * {
    box-sizing: border-box;
  }
}
.container {
  padding: 40px;
  max-width: 1200px;
  margin: auto;
}
h1,
h2,
h3,
h4,
h5 {
  color: $secondary-color;
}
h3 {
  font-size: 18px;
  line-height: 23px;
  font-style: normal;
  font-weight: normal;
}
hr {
  border: 0.5px solid $nav-color;
  margin: 20px 0 20px 0;
}
p {
}
input[type="radio"] {
  margin: 0;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="text"],
input[type="number"] {
  background-color: $nav-color;
  border: 1px solid $nav-color;
  border-radius: 3px;
  color: $default-color;
  font-size: 14px;
  line-height: 18px;
  font-style: normal;
  font-weight: normal;
  padding: 0 10px 0 10px;
  text-align: start;
  text-decoration: none;
  height: 32px;
  &::placeholder {
    color: $default-color;
  }
}
button {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $tertiary-color; /* Green */
  border: none;
  color: $default-color;
  border-radius: 3px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: 104px;
  height: 32px;
  &:active,
  &:hover,
  .active {
    background-color: $nav-color;
  }
}
button {
  transition: background-color 0.2s linear;
}
#app {
  opacity: 0;
  transition: opacity 1s ease;
  .ready {
    display: none;
  }
}
table {
  width: 100%;
}
table td {
  width: calc(100% / 3);
}

table td,
table th {
  padding: 8px;
}
table th:first-child {
  border-radius: 5px 0 0 0;
}
table th:last-child {
  border-radius: 0 5px 0 0;
}
table tr:nth-child(even) {
  background-color: rgba($nav-color, 0.1);
}
table tr:nth-child(odd) {
  background-color: lighten(rgba($primary-color, 0.1), 10%);
}

table tr:hover {
  background-color: $nav-color;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: rgba($tertiary-color, 0.1);
  color: $secondary-color;
  font-weight: normal;
}

#app.ready {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fadeUp-enter-active {
  animation: fadeInUp 0.4s;
}
.fadeUp-leave-active {
  animation: fadeOutUp 0.4s;
}
.fadeUp-move {
  transition: transform 0.2s;
}
.fadeInUp-enter-active {
  animation: fadeInUp 0.4s;
}
.fadeInUp-move {
  transition: transform 0.2s;
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeOutUp {
  0% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 0;
    transform: translateY(50%);
  }
}
</style>
