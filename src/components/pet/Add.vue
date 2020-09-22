<template>
  <div class="mt-20 container">
    <div class="ml-auto mr-auto w-50">
      <b-card header="Add a Pet" header-tag="header" header-class="text-left">
        <div
          v-if="show"
          class="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {{ msg }}
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div
          v-if="showErr"
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <ul>
            <li v-for="(err, index) in errors" :key="index">{{ err.msg }}</li>
          </ul>
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

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
            <select class="form-control" name="type" v-model="form.type">
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
            <b-form-select
              id="input-3"
              v-model="form.breed"
              :options="breeds"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your Location:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.location"
              placeholder="E.g Boston, MA"
            ></b-form-input>
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
        breed: null,
        location: "",
        latitude: "",
        longitude: "",
      },
      pets: {},
      breeds: [
        { text: "Select One", value: null },
        "German Shepherds",
        "Golden Retrievers",
        "Poodles",
        "Rottweilers",
        "Labrador Retrievers",
        "British Shorthair",
        "Persian",
        "Maine Coon",
      ],
      msg: "",
      errors: {},
      show: false,
      showErr: false,
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
            this.showErr = true;
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
      this.form.location = "";
      this.form.latitude = "";
      this.form.longitude = "";
      this.msg = "";
      this.show = false;
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
