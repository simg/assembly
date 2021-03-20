<script lang="ts">

import type { Author } from '../lib/types';
import type { Comment } from '../lib/comment-tree';
import { operationStore, mutation } from '@urql/svelte';

import ShowComment from './ShowComment.svelte';
import Content from './Content.svelte';
import { dateTimeFormat } from '../lib/dateHelpers';


export let comment : Comment;

const upvoteCommentMutation = mutation(operationStore(`
    mutation ($commentId : BigInt!) {
        upvoteComment(input: {commentId: $commentId}) {
          clientMutationId
        }
      }
  `));

const upvoteCommentCancelMutation = mutation(operationStore(`
  mutation ($commentId : BigInt!) {
      upvoteCommentCancel(input: {commentId: $commentId}) {
        clientMutationId
      }
    }
`));

const downvoteCommentMutation = mutation(operationStore(`
    mutation ($commentId : BigInt!) {
        downvoteComment(input: {commentId: $commentId}) {
          clientMutationId
        }
      }
  `));

const downvoteCommentCancelMutation = mutation(operationStore(`
  mutation ($commentId : BigInt!) {
      downvoteCommentCancel(input: {commentId: $commentId}) {
        clientMutationId
      }
    }
`));


function btnUpvoteClick() {
  upvoteCommentMutation({commentId:comment.id});
  $:comment.upvotes++;
}

function btnDownvoteClick() {
  downvoteCommentMutation({commentId:comment.id});
}

function btnReplyClick() {

}

function btnToggleCommentExpandedClick() {
  comment.expanded = !comment.expanded;
}

</script>

<style lang="scss">
  .reply-count {
    margin:0 0 10px 0px;
  }

  .comment-replies {
    
  }

  .thread {
    padding-left:15px;
    position:relative;
  }

  .threadline {
    border-left:6px solid #fff;
    border-right:6px solid #fff;
    width:3px;
    background:#ccc;
    height:100%;
    position:absolute;
    left:-2px;

    &:hover {
      background:#666;
    }
  }
</style>
  

{#if comment.expanded}
<article class="comment">
  <header>
    <div class="meta-text btn-comment-collapse" on:click={btnToggleCommentExpandedClick}>
      <span class="author-name">{comment.author.firstName} {comment.author.lastName}</span>
      replied <span class="meta-date">{dateTimeFormat(comment.createdDate)}</span>
    </div>          
  </header>
  <div class="thread">
    <div class="threadline" on:click={btnToggleCommentExpandedClick}></div>
    <div class="comment-text"><Content output={comment.comment} /></div>
    <div class="comment-actions">
      <button class="btn btn-upvote" on:click|preventDefault={btnUpvoteClick}><span class="text">Upvote</span><span class="count">{comment.upvotes}</span></button>
      <button class="btn btn-reply" on:click|preventDefault={btnReplyClick}>Reply</button>
    </div>
    {#if comment.replies.length > 0}
    <div class="comment-replies">
      <div class="content">
        <div class="reply-count">{comment.replies.length} replies</div>
        {#each comment.replies as reply}
          <ShowComment comment={reply} />
        {/each}
      </div>
    </div>
    {/if}
  </div>
</article>
{:else}
  <div class="comment-summary meta-text btn-comment-expand" on:click={btnToggleCommentExpandedClick}>
    <span class="author-name">{comment.author.firstName} {comment.author.lastName}</span>
    replied <span class="meta-date">{dateTimeFormat(comment.createdDate)}</span>
  </div>
{/if}
