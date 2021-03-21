<script lang="ts">

import { createEventDispatcher } from 'svelte';

import { operationStore, mutation } from '@urql/svelte';

import type { Author } from '../lib/types';
import type { Comment } from '../lib/comment-tree';
import ShowComment from './ShowComment.svelte';
import Content from './Content.svelte';
import Editor from './Editor.svelte';
import { dateTimeFormat } from '../lib/dateHelpers';

const dispatch = createEventDispatcher();

const currentUser = {
  id:'1',
  firstName:'Simon',
  lastName:'Gardner'
}

export let comment : Comment;
export let questionId : string ;
export let parentId : string | undefined;

let error : any | undefined;

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

const addCommentMutation = mutation(operationStore(`
    mutation ($questionId: BigInt!, $parentId: BigInt!, $comment: JSON!) {
      addComment(input: {questionId: $questionId, parentId:$parentId, comment:$comment }) {
        clientMutationId
      }
    }
  `));

const updateCommentMutation = mutation(operationStore(`
  mutation ($commentId: BigInt!, $comment: JSON!) {
    updateComment(input: {commentId : $commentId, comment: $comment }) {
      questtionComment {
        id
        comment
      }
      clientMutationId
    }
  }
`));


async function btnUpvoteClick() {
  if (comment.isUserUpvoted) {
    upvoteCommentCancelMutation({commentId:comment.id})
      .then(() => {
        comment.isUserUpvoted = false;
        comment.upvotes--;
      });
    return       
  };
  if (comment.isUserDownvoted) {
    await downvoteCommentCancelMutation({commentId:comment.id})
      .then(() => {
        comment.isUserDownvoted = false;
        comment.downvotes--;
      })
  }
  upvoteCommentMutation({commentId:comment.id})
    .then(() => {
      comment.isUserUpvoted = true;
      comment.upvotes++;
    });
  
}

async function btnDownvoteClick() {
  if (comment.isUserDownvoted) {
    downvoteCommentCancelMutation({commentId:comment.id})
      .then(() => {
        comment.isUserDownvoted = false;
        comment.downvotes--;
      });
    return      
  };
  if (comment.isUserUpvoted) {
    await upvoteCommentCancelMutation({commentId:comment.id})
      .then(() => {
        comment.isUserUpvoted = false;
        comment.upvotes--;
      });
  }  
  downvoteCommentMutation({commentId:comment.id})
    .then(() => {
      comment.isUserDownvoted = true;
      comment.downvotes++;
    });
}

function btnReplyClick() {
  comment.replies = [{
      id: undefined,
      parentId: comment.id,
      comment: [],
      upvotes: 0,
      downvotes:0,
      isUserUpvoted:false,
      isUserDownvoted:false,
      author: currentUser,
      createdDate: new Date(),
      replies: [],
      expanded: true,
      showEdit:true
    }, ...comment.replies];
}

function btnSaveReplyClick() {
  if (comment.id) {
      updateCommentMutation({commentId: comment.id, comment : comment.comment}).then(res => {
        if (res.error) {
          error = res.error;// TODO: something better than this
        } else {
          //dispatch('commentUpdated', {});
          comment.showEdit=false;
        }
      });
    } else {
      addCommentMutation({questionId: questionId, parentId:parentId, comment : comment.comment}).then(res => {
        if (res.error) {
          error = res.error;// TODO: something better than this
        } else {
          //refreshAnswer();
          //dispatch('answerClosed', {});  
          comment.showEdit=false;
        }
      });
    }
}

function btnToggleCommentExpandedClick() {
  comment.expanded = !comment.expanded;
}

</script>

<style lang="scss">
  .reply-count {
    margin:0 0 10px 0px;
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
  {#if comment.showEdit}
    <Editor editorId="comment-{comment.parentId}-{comment.id}" bind:content={comment.comment} minHeight={30} />
    <button class="btn btn-save-reply" on:click|preventDefault={btnSaveReplyClick}>Save Reply</button>
  {:else}
      <header>
        <div class="meta-text btn-comment-collapse" on:click={btnToggleCommentExpandedClick}>
          <span class="author-name">{comment.author.firstName} {comment.author.lastName}</span>
          replied <span class="meta-date">{dateTimeFormat(comment.createdDate)}</span>
          upvotes:<span class="count">{comment.upvotes}</span>, 
          downvotes:<span class="count">{comment.downvotes}</span> 
        </div>          
      </header>
      <div class="thread">
        <div class="threadline" on:click={btnToggleCommentExpandedClick}></div>
        <div class="comment-text"><Content output={comment.comment} /></div>
        <div class="comment-actions">
          <button class="btn btn-upvote {comment.isUserUpvoted ? 'set':'unset'}" on:click|preventDefault={btnUpvoteClick}><span class="text">Upvote</span></button>
          <button class="btn btn-downvote {comment.isUserDownvoted ? 'set':'unset'}" on:click|preventDefault={btnDownvoteClick}><span class="text">Downvote</span></button>
          <button class="btn btn-reply" on:click|preventDefault={btnReplyClick}>Reply</button>
        </div>
        {#if comment.replies.length > 0}
        <div class="comment-replies">
          <div class="content">
            <div class="reply-count">{comment.replies.length} replies</div>
            {#each comment.replies as reply}
              <ShowComment questionId={questionId} parentId={comment.id} comment={reply} />
            {/each}
          </div>
        </div>
        {/if}
      </div>
    
  {/if}
  </article>
{:else}
  <div class="comment-summary meta-text btn-comment-expand" on:click={btnToggleCommentExpandedClick}>
    <span class="author-name">{comment.author.firstName} {comment.author.lastName}</span>
    replied <span class="meta-date">{dateTimeFormat(comment.createdDate)}</span>
    upvotes:<span class="count">{comment.upvotes}</span>, 
    downvotes:<span class="count">{comment.downvotes}</span> 
  </div>
{/if}
