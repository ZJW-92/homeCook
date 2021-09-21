<template>
  <div>
    <h5>{{ingredient.quantity}}  {{ingredient.name}}</h5>
  </div>
</template>

<script>
export default {
  name: 'ingredient-item',
  props: ['ingredient']
}
</script>

<style scoped>
p {
  background-color: white
}
</style>
