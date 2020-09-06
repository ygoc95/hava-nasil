<template>
  <div>
    <nav class="navbar " role="navigation" aria-label="main navigation">
      <div class="navbar-brand">        
        <a class="navbar-item " href="/">
          <img src="@/assets/images/hava-nasil-brand.png">
        </a>
      
        <a role="button" class="navbar-burger burger" v-bind:class="{'is-active':showNavbarBurger}" @click ="showNavbarBurger=!showNavbarBurger"  aria-label="menu" aria-expanded="false" data-target="navbarItems">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarItems" class="navbar-menu" v-bind:class="{'is-active':showNavbarBurger}" >
        <div class="navbar-end">
          <div class="navbar-item">            
            <input class="searchInput input" type="text" v-model="searchText" @input="searchInput" name="searchInput" id="searchInput" placeholder="Şehir ismi giriniz.">
          </div>
          <div class="navbar-item">            
            <a href="https://github.com/ygoc95" class="navbar-item">
              <img src="@/assets/images/social-media/GitHub-Mark-64px.png" class="mr-2" alt="">
              Github
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { debounce } from 'debounce'


var data = {
  'showNavbarBurger':false,
  'searchText':''
  };
export default {
  name:'navbar',
  data: function(){
    return data;
    },
  methods:{
    searchInput:debounce(function(){
      this.$store.commit('change',this.searchText);
      console.log('bounced :');
    },800)
  }
 
  
  
}
</script>

<style >

 .navbar{
  background-color: #1d71f2;
  width: 100%;
  
  }
  .navbar-item{

    margin: 5px;
    color: black;
  } 
  .navbar-menu :hover{
      color: #19C3FB;

  }

</style>