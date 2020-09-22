<template>
  <div class="mt-20 container">
    <b-card
      header-html="<h4>Does My Pet Need An Umbrella?</h4>"
      header-tag="header"
      header-class="text-center"
    >
      <b-card-text>
        <h5>Select a Pet to find Out</h5>
        <b-table striped hover :items="items" :fields="fields">
          <template v-slot:cell(index)="data">
            {{ data.index + 1 }}
          </template>

          <!-- A virtual composite column -->
          <template v-slot:cell(action)="data">
            <b-link :to="{ name: 'Show', params: { id: data.item.id } }"
              >View</b-link
            >
          </template>
        </b-table></b-card-text
      >
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fields: [
        "index",
        { key: "name", label: "Pet Name" },
        { key: "type", label: "Pet Type" },
        { key: "breed", label: "Pet Breed" },
        { key: "action", label: "Action" },
      ],
      items: [],
    };
  },
  methods: {
    getPets() {
      axios
        .get(process.env.VUE_APP_API_URL + "/pets/1/10")
        .then((response) => {
          this.items = response.data.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  created() {
    this.getPets();
  },
};
</script>

<style>
.mt-20 {
  margin-top: 20px;
}
</style>
