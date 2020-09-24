<template>
  <div class="mt-20 container">
    <b-card header="Weather check" header-tag="header" header-class="text-left">
      <b-card-text>
        <b-card-text>
          <h3>{{ weather }}</h3>
          <p>
            It looks like {{ pet.name }} is
            <span v-if="weather == 'Nope!'">not</span> going to need one in
            {{ pet.location }}
          </p>
          <router-link :to="{ name: 'List' }"
            >Lookup a different pet!</router-link
          >
        </b-card-text>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: 0,
      pet: {},
      loc_key: "",
      weather: "",
    };
  },
  created() {
    if (this.$route.params.id != null) {
      this.id = this.$route.params.id;
      this.getPet();
    } else {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    getPet() {
      axios
        .get(process.env.VUE_APP_API_URL + "/pets/" + this.id)
        .then((response) => {
          this.pet = response.data.data;
          this.getLocationKey();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    getLocationKey() {
      axios
        .get(
          process.env.VUE_APP_ACCUWEATHER_LOCATION_URL +
            process.env.VUE_APP_ACCUWEATHER_KEY +
            "&q=" +
            this.pet.latitude +
            "," +
            this.pet.longitude
        )
        .then((response) => {
          this.loc_key = response.data.Key;
          this.pet.location =
            response.data.LocalizedName + ", " + response.data.Country.ID;
          this.getWeather();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getWeather() {
      axios
        .get(
          process.env.VUE_APP_ACCUWEATHER_FORCAST_URL +
            this.loc_key +
            "?apikey=" +
            process.env.VUE_APP_ACCUWEATHER_KEY
        )
        .then((response) => {
          this.weather = response.data[0].PrecipitationType;
          if (response.data[0].PrecipitationType == "Rain") {
            this.weather = "Yup!";
          } else {
            this.weather = "Nope!";
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>

<style></style>
