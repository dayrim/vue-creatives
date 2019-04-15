<template>
  <div class="card">
    <form @submit.prevent="validateBeforeSubmit">
      <div class="card-title">
        <h3>New Creative</h3>
      </div>
      <div class="card-body">
        <p>General info</p>
        <hr class="line-break" />
        <div class="flex-row">
          <label class="flex-label" for="name">Creative name: </label>
          <div class="flex-input">
            <div class="name-control">
              <input
                id="name"
                v-model.trim="creative.name"
                v-validate="'required'"
                placeholder="Write name here"
                name="name"
                type="text"
              />
              <transition name="fadeUp">
                <span v-show="errors.has('name')" class="error">{{ errors.first("name") }}</span>
              </transition>
            </div>
          </div>
        </div>
        <div class="flex-row">
          <label class="flex-label">Device: </label>
          <div class="flex-input">
            <div v-for="(device, index) in formData.devices" :key="index" class="device-control">
              <input
                :id="device"
                v-model="creative.device"
                class="device-radio-button"
                type="radio"
                :value="device"
                :checked="'checked'"
              />
              <button type="button" :class="creative.device === device ? 'active' : null">
                <label :for="device">{{ device }}</label>
              </button>
            </div>
          </div>
        </div>
        <div class="flex-row">
          <label class="flex-label">Placement size: </label>
          <div class="flex-input">
            <div v-for="(size, index) in formData.size" :key="index" class="size-control">
              <input :id="size" v-model="creative.size" type="radio" :value="size" />

              <label :for="size"
                ><span><span></span></span>{{ size }}</label
              >
            </div>
          </div>
        </div>
        <div class="flex-row">
          <div class="flex-label"></div>
          <div class="flex-input">
            <div
              v-for="(dimension, index) in formData.dimensions"
              :key="index"
              class="dimension-control"
              :class="size === 'Fullscreen' ? 'inactive' : null"
            >
              <input
                :id="dimension"
                v-model.number="formData[dimension]"
                v-validate="'required|numeric|min_value:1'"
                :name="dimension"
                type="text"
                :disabled="size === 'Fullscreen'"
                :placeholder="dimension | capitalize"
              />

              <transition name="fadeUp">
                <span v-show="errors.has(dimension) && creative.size === 'Size'" class="error">{{
                  errors.first(dimension)
                }}</span>
              </transition>
              <label :for="dimension">{{ dimension | firstLetter }}</label>
            </div>
          </div>
        </div>
        <hr class="line-break" />
      </div>
      <div class="card-footer">
        <button type="reset" class="close-button" @click.prevent="toggleAddMode">
          Close
        </button>
        <button type="submit" value="Publish">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ADD_CREATIVE, TOGGLE_ADD_MODE } from "../data/constants";

export default {
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    firstLetter: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase();
    },
  },
  data() {
    return {
      creative: {
        name: "",
        device: "Mobile",
        size: "Fullscreen",
      },
      formData: {
        devices: ["Mobile", "Desctop"],
        size: ["Fullscreen", "Size"],
        dimensions: ["width", "height"],
        width: null,
        height: null,
      },
    };
  },
  computed: {
    name() {
      return this.creative.name;
    },
    device() {
      return this.creative.device;
    },
    size() {
      if (this.creative.size == "Size") {
        return `${this.formData.width}x${this.formData.height}`;
      }
      return this.creative.size;
    },
  },

  methods: {
    addCreative() {
      let id = `${this.getRandomInt(0, 99999999)}`;
      let creative = Object.assign({}, { ...this.creative });
      creative.size = this.size;
      // this.$store.dispatch(ADD_CREATIVE, creative);
      this.$store.state.database
        .collection("creatives")
        .doc(id)
        .set(creative);
    },
    [TOGGLE_ADD_MODE]() {
      this.$store.dispatch(TOGGLE_ADD_MODE);
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.addCreative();
        }
      });
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  position: absolute;
  top: 120%;
  left: 0;
  min-width: 100%;
  padding: 5px;
  background-color: #5c0000ee;
  border-radius: 5px;
  z-index: 999;
  border: 1px solid #ffffff17;
}
.error::after {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #5c0000ee;
}
.size-control {
  width: 104px;
  input[type="radio"] {
    display: none;
  }
}
.name-control {
  width: 100%;
  input {
    width: 100%;
  }
}
input[type="radio"] + label > span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #3388ff;
  margin: -1px 4px 0 0;
  vertical-align: middle;
  text-align: center;
  border-radius: 50%;
}
input[type="radio"] + label > span > span {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

input[type="radio"]:checked + label > span > span {
  background-color: #3388ff;
}

input[type="radio"] + label span,
input[type="radio"]:checked + label span {
  transition: background-color 0.2s linear;
}

button.active {
  background-color: #3e4a5e;
}

.line-break {
  margin: 0;
}
.dimension-control.inactive {
  opacity: 0.4;
}
.dimension-control {
  transition: opacity 0.2s linear;
  opacity: 1;
  input {
    width: 104px;
  }
  label {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
}
.close-button {
  background-color: initial;
  color: #fcaf19;
  &:active,
  &:hover {
    background-color: initial;
    border: 1px solid #3e4a5e;
  }
}

.card-footer {
  margin: 0 7% 0 7%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 80px;
}
.card-title {
  text-align: center;
}
.flex-row {
  display: flex;
  margin: 5% 7% 5% 7%;
  align-items: center;
  flex-wrap: wrap;
}
.flex-label {
  flex: 1 1 40%;
}
.flex-input {
  flex: 1 0 60%;
  display: flex;
  justify-content: space-between;
  & > * {
    display: inline-block;
    position: relative;
  }
}
.device-radio-button {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.card {
  > form {
    padding: 0 5%;
  }
  display: block;
  max-width: 512px;
  border: 1px solid #54637c;
  border-radius: 2px;
}
</style>
