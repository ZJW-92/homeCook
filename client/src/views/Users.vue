<template>
  <b-container>
    <p class="red">{{message}}</p>
    <h1 id="list_users">List of all users:</h1>
<p v-if="!users.length">There are no users.</p>
    <b-row align-h="start">
      <b-col cols="6" sm="4" md="3" v-for="user in users" v-bind:key="user._id">
        <user-item v-bind:user="user" v-on:del-user="deleteUser"/>
      </b-col>
    </b-row>
    <b-button variant="danger"
        v-on:click="deleteAllUser">delete all users !!</b-button>
      <h3 id= "create">Create a user</h3>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="User Name:" label-for="input-1">
          <b-form-input class= "input-1"
            id="input-1"
            v-model="user.username"
            required
            placeholder="Enter user name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Email:" label-for="input-2">
          <b-form-input class= "input-2"
            id="input-2"
            v-model="user.email"
            required
            placeholder="Enter email address"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-textarea class= "input-3"
            id="input-3"
            v-model="user.password"
            required
            placeholder="Enter password"
          ></b-form-textarea>
        </b-form-group>

        <b-button type = "submit" variant="primary">Add user</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
  </b-container>
</template>

<script>
import { Api } from '@/Api'
import UserItem from '@/components/UserItem.vue'

export default {
  name: 'users',
  components: {
    UserItem
  },
  mounted() {
    console.log('PAGE is loaded')
    // Load the real users from the server
    Api.get('/users')
      .then(response => {
        console.log(response.data)
        this.users = response.data.users
      })
      .catch(error => {
        this.message = error.message
        console.error(error)
        this.users = []
        // TODO: display error message
      })
      .then(() => {
        //   This code is always executed at the end. After success or failure.
      })
  },
  data() {
    return {
      users: [],
      message: '',
      text: '',
      user: {
        username: '',
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    deleteUser(id) {
      Api.delete(`/users/${id}`)
        .then(reponse => {
          const index = this.users.findIndex(user => user._id === id)
          this.users.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    },
    deleteAllUser() {
      Api.delete('/users')
        .then(response => {
          // console.log(response.data)
          // window.location.href = window.location.href
          window.location.reload()
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          this.users = []
          // TODO: display error message
        })
        .then(() => {
          //   This code is always executed at the end. After success or failure.
        })
    },
    onSubmit(evt) {
      evt.preventDefault()
      Api.post('/users', this.user)
        .then(response => {
          var user = response.data
          console.log(response.data)
          this.user.id = user._id
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          // make input boxes empty
          this.user.username = null
          this.user.email = null
          this.user.password = null
          window.location.reload()
        })
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.user.username = ''
      this.user.email = ''
      this.user.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
p {
    background-color:bisque;
}
.input-1 {
background-color: antiquewhite;
}
.input-2 {
background-color: antiquewhite;
}
.input-3 {
background-color: antiquewhite;
}
</style>
