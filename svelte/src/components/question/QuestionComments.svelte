<script lang="ts">

  import { setContext } from  'svelte';
  import { Link } from 'svelte-routing';
  import Content from '../content/ContentSummary.svelte';
  import { dateTimeFormat } from '../../lib/dateHelpers';
  import { operationStore, query, mutation } from '@urql/svelte';

  import { emptyCommentTree, updateCommentTree, removeCommentFromTree } from '../../lib/comment-tree';
  import type { Comment } from '../../lib/comment-tree';
  import ShowComment from '../comment/ShowComment.svelte';
  import Editor from '../content/Editor.svelte';
  import type { OutputBlockData } from '@editorjs/editorjs';
  import * as questionCommentAPI from './question-comment.api';

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
  let commentTree = emptyCommentTree();

  // setContext('commentAPI',  questionCommentAPI);
  // setContext('entityType', 'question');
  // setContext('entityId',    questionId);
  // setContext('commentTree', commentTree);

  const currentUser = { //TODO: authentication

    id : '1',
    firstName: 'Simon',
    lastName : 'Gardner'
  };
  
  let newComments = [
    defaultComment()
  ];
  let newCommentCount=0;  

  let commentsQuery = operationStore(questionCommentAPI.fetchCommentsGql, {questionId, userId:currentUser.id}, { requestPolicy: 'network-only' });  
  
  query(commentsQuery);

  commentsQuery.subscribe(res => {
    if (res.data) {
      commentTree = updateCommentTree(commentTree, res.data.questionComments.nodes);
    }
  });  

  const commentAddMutation            = mutation(questionCommentAPI.commentAdd),
        commentDeleteMutation         = mutation(questionCommentAPI.commentDelete),
        commentUpdateMutation         = mutation(questionCommentAPI.commentUpdate),
        commentUpvoteAddMutation      = mutation(questionCommentAPI.commentUpvoteAdd),
        commentUpvoteCancelMutation   = mutation(questionCommentAPI.commentUpvoteCancel),
        commentDownvoteAddMutation    = mutation(questionCommentAPI.commentDownvoteAdd),
        commentDownvoteCancelMutation = mutation(questionCommentAPI.commentDownvoteCancel);        
  
  let error : any | undefined;

  function btnSaveReplyClick(comment) {

    commentAddMutation({questionId: questionId, parentId:undefined, comment : comment.comment})
      .then(res => {
        if (res.error) {
          error = res.error;// TODO: something better than this
        } else {
          console.log("addmutation:commentTree", commentTree)
          comment.id = res.data.questionCommentAdd.questionComment.id;
          comment.showEdit=false;
          commentTree = commentTree;
          newComments = [
            defaultComment()
          ];
          newCommentCount++;
        }
      });
  }

  function handleCommentAdd(event) {
    console.log("handleCommentAdd" ,event)
 
  }

  function handleDeleteComment(event) {
    commentDeleteMutation({commentId:event.detail.id}).then(res => {
       if (res.error) {
        error = res.error;// TODO: something better than this
      } else {
        commentTree = removeCommentFromTree(commentTree, event.detail);
      }
    });
  }

  async function handleCommentUpvote(event) {
    let comment = event.detail.comment;

    if (comment.isUserUpvoted) {
      return commentUpvoteCancelMutation({commentId:comment.id})
        .then(() => {
          comment.isUserUpvoted = false;
          comment.upvotes--;
          event.detail.done();
        });
    };
    if (comment.isUserDownvoted) {
      await commentDownvoteCancelMutation({commentId:comment.id})
        .then(() => {
          comment.isUserDownvoted = false;
          comment.downvotes--;
        })
    }
    commentUpvoteAddMutation({commentId:comment.id})
      .then(() => {
        comment.isUserUpvoted = true;
        comment.upvotes++;
        event.detail.done();
      });    
  }

  async function handleCommentDownvote(event) {
    let comment = event.detail.comment;

    if (comment.isUserDownvoted) {
      return commentDownvoteCancelMutation({commentId:comment.id})
        .then(() => {
          comment.isUserDownvoted = false;
          comment.downvotes--;
          event.detail.done();
        });     
    };
    if (comment.isUserUpvoted) {
      await commentUpvoteCancelMutation({commentId:comment.id})
        .then(() => {
          comment.isUserUpvoted = false;
          comment.upvotes--;
        });
    }  
    commentDownvoteAddMutation({commentId:comment.id})
      .then(() => {
        comment.isUserDownvoted = true;
        comment.downvotes++;
        event.detail.done();
      });
  }



  function handleSaveComment(event) {
    console.log("comment:save", event);
    const comment = event.detail;
    commentAddMutation({questionId: questionId, parentId:comment.parentId, comment : comment.comment})
      .then(res => {
        if (res.error) {
          error = res.error;// TODO: something better than this
        } else {
          comment.id = res.data.questionCommentAdd.questionComment.id;
          comment.showEdit=false;
          //commentTree.comments = [...commentTree.comments, comment];
          commentTree = commentTree;
          newComments = [
            defaultComment()
          ];
          newCommentCount++;
        }
      });       
  }

</script>

{#if $commentsQuery.fetching}]

<p>Loading...</p>
{:else if $commentsQuery.error}
<p>Oh no... {$commentsQuery.error.message}</p>
{:else if error}
<p>Oh no... {$error}</p>
{:else}
  <section>
  {#each commentTree.comments as comment}
    <ShowComment comment={comment} 
      on:delete={handleDeleteComment} 
      on:save={handleSaveComment}
      on:upvote={handleCommentUpvote}
      on:downvote={handleCommentDownvote}
      />
  {/each}
  {#each newComments as newComment}
    {#key newComment.editorId}
      <Editor editorId="comment-{`${newComment.editorId}`}" bind:content={newComment.comment} minHeight={30} />
    {/key}
    <button class="btn btn-save-reply" on:click|preventDefault={() => btnSaveReplyClick(newComment)}>Save Reply</button>
  {/each}
  </section>
{/if}
