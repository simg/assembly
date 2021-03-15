<script lang="ts">

  import { Link } from 'svelte-routing';

  import Content from '../components/ContentSummary.svelte';

  import { dateTimeFormat } from '../lib/dateHelpers';
      
  import { operationStore, query } from '@urql/svelte';

  const comments = operationStore(`
    query MyQuery {
      comments {
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
  `, {}, { requestPolicy: 'network-only' });
  query(comments);	
</script>

<main>
  {#if $comments.fetching}
  <p>Loading...</p>
  {:else if $comments.error}
  <p>Oh no... {$comments.error.message}</p>
  {:else}
    <section>
    {#each $comments.data.comments.nodes as comment}
      <article>
        <header>
          <div class="meta-text">
            <span class="author-name">{comment.author.firstName} {comment.author.lastName}</span>
            commented <span class="meta-date">{dateTimeFormat(comment.createdDate)}</span>
          </div>          
        </header>
        <div class="comment-text"><Content output={comment.comment} /></div>
      </article>
    {/each}
    </section>
  {/if}
</main>