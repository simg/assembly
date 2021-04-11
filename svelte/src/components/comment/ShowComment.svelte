<script lang="ts">

import { getContext, createEventDispatcher } from 'svelte';

import { operationStore, mutation } from '@urql/svelte';

import type { Author } from '../../lib/types';
import { emptyCommentTree, removeCommentFromTree, updateCommentTree } from '../../lib/comment-tree';
import type { Comment, CommentTree } from '../../lib/comment-tree';
import ShowComment from './ShowComment.svelte';
import Content from '../content/Content.svelte';
import Editor from '../content/Editor.svelte';
import { dateTimeFormat } from '../../lib/dateHelpers';

// const commentAPI  = getContext('commentAPI'),
//       entityType  = getContext('entityType'),
//       entityId    = getContext('entityId');

// let commentTree = getContext('commentTree');

// console.log("entityId", entityId);
// console.log("commentTree", commentTree)

const dispatch = createEventDispatcher();

const currentUser = {
  id:'1',
  firstName:'Simon',
  lastName:'Gardner'
}

export let comment : Comment;
export let parentId : string | undefined;

let commentReply : Comment | undefined;

let error : any | undefined;

function btnUpvoteClick() {
  console.log("btnUpvoteClick");
  dispatch('upvote', {comment, done:() => {
    comment=comment; // trick to get svelte to re-render when event has been handled
  }});
}

function btnDownvoteClick() {
  console.log("btnDownvoteClick");
  dispatch('downvote', {comment, done:() => {
    comment=comment; // trick to get svelte to re-render when event has been handled
  }});
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
  dispatch('save', comment);
}

function btnDeleteCommentClick() {
  dispatch('delete', comment);
}

function handleSaveComment(event) {
  dispatch('save', event.detail);
}

function handleDeleteComment(event) {
  if (comment.id === event.detail.parentId) {
    // this is the deleted comments parent
    comment.replies = comment.replies.filter(e => e.id !== event.detail.id);
    comment = comment; //trigger re-render
  }
  dispatch('delete', event.detail);
}

function btnToggleCommentExpandedClick() {
  comment.expanded = !comment.expanded;
}

</script>

<style lang="scss">
  .thread {
    padding-left:15px;
    position:relative;
  }

  .threadline {
    border-left:6px solid #fff;
    border-right:6px solid #fff;
    width:2px;
    background:#ccc;
    height:100%;
    position:absolute;
    left:-1px;

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
          <span class="meta-date">{dateTimeFormat(comment.createdDate)}</span>
          upvotes:<span class="count">{comment.upvotes}</span>  
          downvotes:<span class="count">{comment.downvotes}</span> 
          replies:<spab class="count">{comment.replies.length}<span> 
        </div>          
      </header>
      <div class="thread">
        <div class="threadline" on:click={btnToggleCommentExpandedClick}></div>
        <div class="comment-text"><Content output={comment.comment} /></div>
        <div class="comment-actions">
          <button class="btn btn-upvote {comment.isUserUpvoted ? 'set':'unset'}" on:click|preventDefault={btnUpvoteClick}><span class="text">Upvote</span></button>
          <button class="btn btn-downvote {comment.isUserDownvoted ? 'set':'unset'}" on:click|preventDefault={btnDownvoteClick}><span class="text">Downvote</span></button>
          <button class="btn btn-reply" on:click|preventDefault={btnReplyClick}>Reply</button>
          {#if comment.author.id === currentUser.id}
            <button class="btn btn-delete" on:click|preventDefault={btnDeleteCommentClick}>Delete</button>
          {/if}
        </div>
        {#if comment.replies.length > 0}
        <div class="comment-replies">
          <div class="content">
            {#each comment.replies as reply}
              <ShowComment parentId={comment.id} comment={reply} 
                on:delete={handleDeleteComment}
                on:save={handleSaveComment}
                on:upvote 
                on:downvote
                />
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
