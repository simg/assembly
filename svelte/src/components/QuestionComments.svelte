<script lang="ts">

  import { Link } from 'svelte-routing';
  import Content from '../components/ContentSummary.svelte';
  import { dateTimeFormat } from '../lib/dateHelpers';
  import { operationStore, query, mutation } from '@urql/svelte';

  import { emptyCommentTree, updateCommentTree, removeCommentFromTree, Comment } from '../lib/comment-tree';
  import ShowComment from './ShowComment.svelte';
  import Editor from './Editor.svelte';
  import type { OutputBlockData } from '@editorjs/editorjs';

  function defaultComment() {
    return {
      editorId:Date.now(),
      id: undefined,
      parentId: null,
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
    };
  }  

  export let questionId;
  const currentUser = {
    id : '1',
    firstName: 'Simon',
    lastName : 'Gardner'
  };
  
  let newComments = [
    defaultComment()
  ];
  let newCommentCount=0;
  // let newCommentId = newComment.id;
  // let newCommentComment = newComment.comment;

  const userId = '1'; //TODO: plumb in user context

  $:commentTree = emptyCommentTree();

  const commentsQuery = operationStore(`
    query ($questionId : BigInt!, $userId : BigInt!) {
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
          isUserUpvoted : questionCommentUpvotesByCommentId(condition: {userId: $userId}) {
            totalCount
          }
          isUserDownvoted : questionCommentDownvotesByCommentId(condition: {userId: $userId}) {
            totalCount
          }                        
          createdDate
        }
      }
    }
  `, {questionId, userId}, { requestPolicy: 'network-only' });
  query(commentsQuery).subscribe(res => {
    if (res.data) {
      commentTree = updateCommentTree(commentTree, res.data.questionComments.nodes);
    }
  });

  const addCommentMutation = mutation(operationStore(`
    mutation ($questionId: BigInt!, $parentId: BigInt, $comment: JSON!) {
      addComment(input: {questionId: $questionId, parentId:$parentId, comment:$comment }) {
        clientMutationId
      }
    }
  `));
  
  let error : any | undefined;

  function btnSaveReplyClick(comment) {
    console.log("btbnSaveReplyClick")
    addCommentMutation({questionId: questionId, parentId:undefined, comment : comment.comment}).then(res => {
      if (res.error) {
        error = res.error;// TODO: something better than this
      } else {
        //refreshAnswer();
        //dispatch('answerClosed', {});
        console.log("comment added")
        comment.showEdit=false;
        commentTree.comments = [...commentTree.comments, comment];
        //setInterval(() => {
          //allows svelte to destroy the Editor component before recreating it 
          //with a reference to the new newComment.comment
          newComments = [
            defaultComment()
          ];
          newCommentCount++;
        //},50);
      }
    });
  }

  function handleCommentDeleted(event) {
    //TODO: this won't work for lower level comments. really need to properly implement urql caching?
    console.log("handleCommentDelete:event", event);
    //commentTree = removeCommentFromTree(commentTree, comment);
  }


</script>

{#if $commentsQuery.fetching}
<p>Loading...</p>
{:else if $commentsQuery.error}
<p>Oh no... {$commentsQuery.error.message}</p>
{:else if error}
<p>Oh no... {$error}</p>
{:else}
  <section>
  {#each commentTree.comments as comment}
    <ShowComment questionId={questionId} comment={comment} on:commentDeleted={handleCommentDeleted} />
  {/each}
  {#each newComments as newComment}
    {#key newComment.editorId}
      <Editor editorId="comment-{`${newComment.editorId}`}" bind:content={newComment.comment} minHeight={30} />
    {/key}
    <button class="btn btn-save-reply" on:click|preventDefault={() => btnSaveReplyClick(newComment)}>Save Reply</button>
  {/each}
  </section>
{/if}
