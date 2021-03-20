<script lang="ts">

  import { Link } from 'svelte-routing';
  import Content from '../components/ContentSummary.svelte';
  import { dateTimeFormat } from '../lib/dateHelpers';
  import { operationStore, query } from '@urql/svelte';

  import { Author } from '../lib/types';
  import { emptyCommentTree, CommentTree, Comment, updateCommentTree } from '../lib/comment-tree';
  import ShowComment from './ShowComment.svelte';
  import type { OutputBlockData } from '@editorjs/editorjs';

  export let questionId;

  $:commentTree = emptyCommentTree();

  const commentsQuery = operationStore(`
    query ($questionId : BigInt!) {
      questionComments(condition: {questionId: $questionId}) {
        nodes {
          id
          parentId
          comment
          upvotes
          downvotes
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
  query(commentsQuery).subscribe(res => {
    if (res.data) {
      commentTree = updateCommentTree(commentTree, res.data.questionComments.nodes);
    }
  });	
</script>

{#if $commentsQuery.fetching}
<p>Loading...</p>
{:else if $commentsQuery.error}
<p>Oh no... {$commentsQuery.error.message}</p>
{:else}
  <section>
  {#each commentTree.comments as comment}
    <ShowComment comment={comment} />
  {/each}    
  <!-- {#each $comments.data.questionComments.nodes as comment}
    <article>
      <header>
        <div class="meta-text">
          <div class="author-name">{comment.author.firstName} {comment.author.lastName}</div>
          <div><span class="meta-date">{dateTimeFormat(comment.createdDate)}</span></div>
          <div>comment id {comment.id} parentId {comment.parentId}</div>
        </div>          
      </header>
      <div class="comment-text"><Content output={comment.comment} /></div>
    </article>
  {/each} -->
  </section>
{/if}
