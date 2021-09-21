<template>

  <b-container >
    <p class="red">{{message}}</p>
    <h1 id="heading"> The {{recipe.name}} </h1>
    <b-row>
      <b-col><h5> Duration: {{ recipe.duration}} min</h5></b-col>
    </b-row>
    <b-row>
      <b-col cols="12"><h3> Directions: </h3></b-col>
    </b-row>
    <b-row>
      <b-col> {{ recipe.instruction}}</b-col>
    </b-row>
    <b-row >
      <b-col><h3> Ingredients: </h3></b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" v-for="ingredient in ingredients" v-bind:key="ingredient._id">
        <ingredient-item v-bind:ingredient="ingredient" />
      </b-col>
    </b-row>
</b-container>
</template>

<script>
import { Api } from '@/Api'
import IngredientItem from '@/components/IngredientItem.vue'
export default {
  name: 'recipe-card',
  components: {
    IngredientItem
  },
  props: ['id'],
  mounted() {
    console.log('PAGE is loaded')
    Api.get(`/recipes/${this.id}`)
      .then(response => {
        console.log(response.data)
        this.recipe = response.data
        console.log(this.recipe)
      })
      .catch(error => {
        this.message = error.message
        console.error(error)
      })
    Api.get(`/recipes/${this.id}/ingredients`)
      .then(response => {
        console.log(response.data)
        this.ingredients = response.data.ingredients
        console.log(this.ingredient)
      })
      .catch(error => {
        this.message = error.message
        console.log(error)
      })
  },
  data() {
    return {
      recipes: [],
      recipe: {
        name: '',
        duration: '',
        instruction: ''
      },
      ingredients: [],
      ingredient: {
        name: '',
        quantity: '',
        category: ''
      },
      message: '',
      text: ''
    }
  }

}

</script>

<style scoped>
.red {
    color: red;
}

p {
    background-color: white;
}

@media (min-width: 768px) {
#heading {
      padding: 100pt;
      background-color: rgb(231, 195, 195);
  }
}
@media (max-width: 768px) {
#heading {
      padding: 16pt;
      font-size: 20pt;
      background-color: rgb(231, 195, 195);
  }
}
</style>
