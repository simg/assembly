<script lang="ts">


import { initClient, createClient, defaultExchanges } from '@urql/svelte';
import { dedupExchange, fetchExchange } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import { devtoolsExchange } from '@urql/devtools';

import { Router, Link, Route } from 'svelte-routing';

import Home from './pages/Home.svelte';
import ViewQuestion from './pages/ViewQuestion.svelte';
import AddQuestion from './pages/AddQuestion.svelte';


  initClient({
    url: '/graphql',
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      // Replace the default cacheExchange with the new one
      cacheExchange({
        /* optional config */
      }),
      fetchExchange,
    ],    
  });
  
  export let url='';
		
</script>

<style src="./App.scss" global /> 


<main>
  <Router url="{url}">
    <header id="topnav">
      <h1 id="appname"><Link to="/">Assembly</Link></h1>
      <Link to="/" class="btn-icon btn-home"><span class="text">Home</span></Link>
      <Link to="/following" class="btn-icon btn-following"><span class="text">Following</span></Link>
      <Link to="/notifications" class="btn-icon btn-notifications"><span class="text">Notifications</span></Link>
      <input id="searchbox" type="text" placeholder="Search Assembly" />
      <Link to="/add-question" class="btn-add-question">Add Question</Link>  
    </header>
    <div>
      <Route path="/"><Home /></Route>
      <Route path="question/:id" let:params><ViewQuestion questionId="{params.id}" /></Route>
      <Route path="/add-question"><AddQuestion /></Route>
    </div>
  </Router> 
</main>

