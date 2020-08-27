<template>
  <div class="main-app">
    <main>
      <BaseLayout v-if="token">
        <router-view></router-view>
      </BaseLayout>
      <router-view v-else></router-view>
    </main>
  </div>
</template>


<script>
import BaseLayout from '@/components/layouts/Base';
import jwtService from './services/jwt.service';

export default {
  components: {
    BaseLayout,
  },
  data () {
    return {
      token: null
    }
  },
  watch: {
    $route: {
      handler (newer, old) {
        this.token = jwtService.getToken();
      },
      deep: true
    }
  }, 
  async created () {
    const token = jwtService.getToken();
    if (!token) {
      const current = `${this.$router.history.current.name}`;
      if (current !== 'login') {
        await this.$router.push({
          name: `login`
        });
      }
    } else {
      this.token = token;
      await this.$router.push({
        name: `dashboard`
      });
    }
  }
}
</script>

<style>
  table > thead > tr {
    border: none !important;
  }

  table > tbody > tr {
    background: white !important;
  }

  table > tbody > tr:last-child {
    background: black;
    box-shadow: 0px 1px 0px 0px #ccc;
  }

  table > thead > tr > th{
    background: #333;
    border: none;
    color: white;
  }

  table > thead > tr > th:last-child {
    border-radius: 0px 5px 0px 0px;
  }

  table > thead > tr > th:nth-child(1) {
    border-radius: 5px 0px 0px 0px;
  }
  
  body {
    background: #f5f5f5 !important;
  }

  .menu-nabvar {
    background: black !important; 
  }

  nav {
    background: white !important;
    border-bottom: 1px solid #ccc;
    box-shadow: 0px 1px #ccc;
  }

  .crud-form .chevron-left {
      cursor: pointer;
  }

  .crud-form > #form{
      padding: 2%;
      border-radius: 5px;
      padding: 0;
      box-shadow: 1px 1px 1px 1px #ccc;
      max-width: 100%;
  }

  .crud-form > #form > #head {
      border-bottom: 1px solid #ccc;
      padding: 1%;
      background: #333;
      border-radius: 5px 5px 0px 0px;
  }

  .crud-form #form > #head h6 {
      margin-top: 0.5%;
      color: white;
  }

  .crud-form #form > #body {
      background: white;
      padding: 1.5%;
      border-radius: 0px 0px 5px 5px;
  }
</style>
