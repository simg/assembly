<script lang="ts">

  import { Link } from 'svelte-routing';

  import ContentSummary from '../components/ContentSummary.svelte';

  import { dateFormat } from '../lib/dateHelpers';
      
  import { operationStore, query } from '@urql/svelte';
  const answers = operationStore(`
    query MyQuery {
      answers {
        totalCount
        nodes {
          id
          answer
          author {
            id
            firstName
            lastName
          }
          createdDate
          question {
            question
            id
            author {
              id
              firstName
              lastName
            }
            createdDate
          }
        }
      }
    }
  `, {}, { requestPolicy: 'network-only' });
  query(answers);	
</script>

<main>
  {#if $answers.fetching}
  <p>Loading...</p>
  {:else if $answers.error}
  <p>Oh no... {$answers.error.message}</p>
  {:else}
    <section>
    {#each $answers.data.answers.nodes as answer}
      <article>
        <header>
          <div class="meta-text">
            <span class="author-name">{answer.author.firstName} {answer.author.lastName}</span>
             answered <span class="meta-date">{dateFormat(answer.createdDate)}</span>
          </div>          
          <h3 class="question-text"><Link to="/question/{answer.question.id}">{answer.question.question}</Link></h3>
        </header>
        <div class="answer-text"><ContentSummary output={answer.answer} /></div>
      </article>
    {/each}
    </section>
  {/if}
</main>