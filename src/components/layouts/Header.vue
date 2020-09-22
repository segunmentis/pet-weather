<template>
  <b-navbar toggleable="lg" type="dark" variant="info" sticky>
    <b-navbar-brand href="#">Pet Weather</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link :to="{ name: 'List' }" class="nav-link">Home</router-link>
        <router-link :to="{ name: 'Add' }" class="nav-link"
          >Add A Pet</router-link
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style></style>
