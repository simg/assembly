<script lang="ts">

  import { Link } from 'svelte-routing';

  import Content from '../components/ContentSummary.svelte';

  import { dateTimeFormat } from '../lib/dateHelpers';
      
  import { operationStore, query } from '@urql/svelte';

  export let questionId;

  const comments = operationStore(`
    query ($questionId : BigInt!) {
      questionComments(condition: {questionId: $questionId}) {
        nodes {
          id
          comment
          author {
            id
            firstName
            lastName
          }
          createdDate
        }
      }
    }
  `, {questionId}, { requestPolicy: 'network-only' });
  query(comments);	
</script>

{#if $comments.fetching}
<p>Loading...</p>
{:else if $comments.error}
<p>Oh no... {$comments.error.message}</p>
{:else}
  <section>
  {#each $comments.data.questionComments.nodes as comment}
    <article>
      <header>
        <div class="meta-text">
          <div class="author-name">{comment.author.firstName} {comment.author.lastName}</div>
          <div>commented <span class="meta-date">{dateTimeFormat(comment.createdDate)}</span></div>
        </div>          
      </header>
      <div class="comment-text"><Content output={comment.comment} /></div>
    </article>
  {/each}
  </section>
{/if}
