<script lang="ts">


import { initClient, createClient, defaultExchanges } from '@urql/svelte';
import { dedupExchange, fetchExchange } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import { devtoolsExchange } from '@urql/devtools';

import { Router, Link, Route } from 'svelte-routing';

import Home from './pages/Home.svelte';
import ViewQuestion from './pages/ViewQuestion.svelte';
import AddQuestion from './pages/AddQuestion.svelte';
import Comments from './pages/Comments.svelte';

	// const client = createClient({
	// 	url: '/graphql',
	// 	exchanges: [devtoolsExchange, ...defaultExchanges],
	// });

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


<main>
  <Router url="{url}">
    <header>
      <h1 id="appname"><Link to="/">Assembly</Link></h1>
      <Link to="/add-question" class="btn">Add Question</Link>  
      <!-- <Link to="/admin/comments" class="btn">Comments Admin</Link> -->
    </header>
    <div>
      <Route path="/"><Home /></Route>
      <Route path="question/:id" let:params><ViewQuestion questionId="{params.id}" /></Route>
      <Route path="/add-question"><AddQuestion /></Route>
      <Route path="/admin/comments"><Comments /></Route>
    </div>
  </Router> 
</main>

<style src="./App.scss" global />