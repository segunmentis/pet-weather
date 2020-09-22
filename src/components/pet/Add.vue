<template>
  <div class="mt-20 container">
    <div class="ml-auto mr-auto w-50">
      <b-card header="Add a Pet" header-tag="header" header-class="text-left">
        <b-alert
          variant="danger"
          :show="showAlert"
          dismissible
          @dismissed="resetAlert"
        >
          <ul>
            <li v-for="(err, index) in errors" :key="index">{{ err.msg }}</li>
          </ul>
        </b-alert>
        <b-alert
          variant="success"
          :show="show"
          dismissible
          @dismissed="resetAlert"
          >{{ msg }}</b-alert
        >

        <b-form @submit.prevent="onSubmit" class="text-left">
          <b-form-group
            id="input-group-1"
            label="Pet Name:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.name"
              placeholder="Enter Name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Pet Type:"
            label-for="input-3"
          >
            <select
              class="form-control"
              name="type"
              v-model="form.type"
              @change="getBreed($event)"
            >
              <option value="">Select a Pet Type</option>
              <option
                v-for="(pet, index) in pets"
                :key="index"
                :value="pet.name"
                >{{ pet.name }}</option
              >
            </select>
          </b-form-group>
          <b-form-group
            id="input-group-3"
            label="Pet Breed:"
            label-for="input-3"
          >
            <select class="form-control" name="breed" v-model="form.breed">
              <option value="">Select a Breed</option>
              <option
                v-for="(br, index) in breeds"
                :key="index"
                :value="br.name"
                >{{ br.name }}</option
              >
            </select>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        type: "",
        breed: "",
        latitude: "",
        longitude: "",
      },
      pets: {},
      breeds: {},
      msg: "",
      errors: {},
      show: false,
      showAlert: false,
    };
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios
        .post(process.env.VUE_APP_API_URL + "/pets/add", this.form)
        .then((response) => {
          console.log(response);
          this.msg = response.data.message;
          this.show = true;
          this.reset();
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 422) {
            this.errors = error.response.data.error;
            this.showAlert = true;
          }
        });
    },

    getTypes() {
      axios
        .get(process.env.VUE_APP_API_URL + "/types")
        .then((response) => {
          this.pets = response.data.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    getBreed(event) {
      let id = event.target.value;
      if (id != 0) {
        this.form.breed = "";
        axios
          .get(process.env.VUE_APP_API_URL + "/breeds/" + id)
          .then((response) => {
            this.breeds = response.data.data;
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        this.breeds = "";
        this.form.breed = "";
      }
    },

    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.latitude = position.coords.latitude;
            this.form.longitude = position.coords.longitude;
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    },

    reset() {
      this.form.name = "";
      this.form.type = null;
      this.form.breed = null;
      this.form.latitude = "";
      this.form.longitude = "";
    },

    resetAlert() {
      this.showAlert = false;
      this.show = false;
      this.msg = "";
      this.errors = {};
    },
  },
  created() {
    this.getLocation();
    this.getTypes();
  },
};
</script>

<style>
.wd-50 {
  width: 50px;
}
</style>
