<template>
  <div>
    <div>
      <h2 class="mtop">Map of Pets</h2>

      <br />
    </div>
    <br />
    <gmap-map :center="center" :zoom="2" style="width:100%;  height: 400px;">
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
      </gmap-info-window>

      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="toggleInfoWindow(m, i)"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      center: { lat: 0, lng: 0 },
      markers: [],
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

      infoOptions: {
        content: "",
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },

  created() {
    this.getPetsLocation();
  },

  methods: {
    getPetsLocation() {
      let lats = [];
      let longs = [];
      axios.get(process.env.VUE_APP_API_URL + "/pets/0/4").then((response) => {
        response.data.data.forEach((result) => {
          lats.push(result.latitude);
          longs.push(result.longitude);
          this.addMarker(result.latitude, result.longitude, result.name);
        });
        this.center = { lat: Math.min(...lats), lng: Math.max(...longs) };
      });
    },
    addMarker(lat, long, info) {
      const marker = {
        lat: lat,
        lng: long,
      };
      this.markers.push({ position: marker, infoText: info });
    },

    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.infoText;

      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
  },
};
</script>

<style scoped>
.mtop {
  margin-top: 20px;
}
</style>
