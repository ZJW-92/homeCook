<template>
    <div>
      <b-button class="button" variant="outline-primary"
          router-link :to="'/recipes/' + recipe._id">{{recipe.name}}</b-button>
      <b-button-close class="crossbutton"
          v-on:click="$emit('del-recipe', recipe._id)">&times;</b-button-close>
    </div>
</template>

<script>
export default {
  name: 'recipe-item',
  props: ['recipe'],
  methods: {
    // deleteRecipe() {
    //   this.$emit('del-recipe', this.recipe._id)
    //   console.log('del-recipe with id:' + this.recipe._id)
    // }
  }
}
</script>

<style scoped>
p {
    background-color: white;
}

  .button {
    background-color: rgb(231, 195, 195);
    border: white;
    color: rgb(129, 36, 51);
    padding: 2px 2px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    margin: 2px 2px;
    cursor: pointer;
  }
  .crossbutton {
    background-color: white;
    color: rgb(129, 36, 51);
    padding: 2px 2px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    margin: 2px 2px;
    cursor: pointer;
  }

</style>
