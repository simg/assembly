<script lang="ts">

  import * as _ from 'lodash';
  import { onMount }  from 'svelte';

  import { Link } from "svelte-routing";
  import EditAnswer from '../components/EditAnswer.svelte';
  import Content from '../components/Content.svelte';

  import { dateFormat } from '../lib/dateHelpers';
      
  import { operationStore, query, mutation } from '@urql/svelte';
import AddComment from '../components/AddComment.svelte';

  export let questionId;
  export let userId = 1;

  let showAddAnswer = false;
  let editAnswerId : string | undefined;
  let showQuestionComments = false;

  const questionParameters = {
    cacheBuster : 0
  }
  
  const question = operationStore(`
      query MyQuery {
        question(id: ${questionId}) {
          __typename
          id
          question
          createdDate
          questionFollowers {
            totalCount
          }
          isUserFollowing : questionFollowers(condition: {userId: "${userId}"}) {
            totalCount
          }          
          answers {
            totalCount
            nodes {
              __typename
              id
              answer
              author {
                __typename
                id
                firstName
                lastName
              }
              createdDate
              answerComments {
                totalCount
              }
            }
          }
        }
      }
    `, questionParameters, { requestPolicy: 'network-only' });  

  query(question);

  const followQuestionMutation = mutation(operationStore(`
      mutation ($questionId : BigInt!) {
          followQuestion(input: {questionId: $questionId}) {
            clientMutationId
          }
        }
    `));

  const unfollowQuestionMutation = mutation(operationStore(`
    mutation ($questionId : BigInt!) {
        unfollowQuestion(input: {questionId: $questionId}) {
          clientMutationId
        }
      }
  `));    

  const deleteAnswerMutation = mutation(operationStore(`
    mutation MyMutation($answerId: BigInt!) {
      deleteAnswer(input: {answerId: $answerId}) {
        clientMutationId
      }
    }
  `));  

  function refreshQuestion() {
    questionParameters.cacheBuster++;
    $question.variables = _.clone(questionParameters);    
  }

  function toggleFollowQuestionClick(following : boolean) {
    if (following) {
      unfollowQuestionMutation({questionId : questionId})
        .then(() => refreshQuestion());
    } else {
      followQuestionMutation({questionId : questionId})
        .then(() => refreshQuestion());
    }
  }

  function btnAddAnswerClick() {
    showAddAnswer = !showAddAnswer;
  }

  function btnEditAnswerClick(answerId) {
    editAnswerId = answerId;
  }  

  function handleAnswerClosed(event) {
    showAddAnswer = false;
    editAnswerId = undefined;
    refreshQuestion();
  }

  function btnDeleteAnswerClick(answer_id) {
    deleteAnswerMutation({answerId:answer_id}).then(() => {
      refreshQuestion();
    });
  }

  // function handleAddCommentCancelled($event) {
  //   console.log("btnAddCommentCancelledClick", $event);
  //   showAddQuestionComment = false;
  // }

  // function handleAddComment($event) {
  //   console.log("handleAddComment", $event);
  // }  

  function btnShowCommentsClick($event) {
    console.log("btnShowCommentsClick", $event);
    showQuestionComments = true;
  }  


</script>

<style>
  article.question-body {
    max-width: 640px;
  }
  .answer-actions {
    margin:15px 0;
  }
</style>

<main>
  {#if $question.fetching}
  <p>Loading...</p>
  {:else if $question.error}
  <p class="error">Oh no... {$question.error.message}</p>
  {:else}
    <article class="question-body">
      <h2>{question.data.question.question}</h2>
      <div class="question-actions">
        <button on:click={btnAddAnswerClick}>Answer</button>
        <button on:click={() => toggleFollowQuestionClick(question.data.question.isUserFollowing.totalCount > 0)}>
          { question.data.question.isUserFollowing.totalCount > 0 ? 'Unfollow' : 'Follow'}
          . {question.data.question.questionFollowers.totalCount}</button>
        <button on:click={btnShowCommentsClick}>Comments . {0}</button>
        <button>Downvote</button>
        <button>Share</button>
        <button>More options</button>
      </div>
      <!-- {#if showQuestionComments }
         <AddComment on:cancelled={handleAddCommentCancelled} on:addComment={handleAddComment} /> -->
      <!-- {/if} -->
      {#if showAddAnswer}
        <EditAnswer questionId={questionId} on:answerClosed={handleAnswerClosed}/>
      {/if}
      <div class="answer-count">
        {question.data.question.answers.totalCount} answers
      </div>
      {#each $question.data.question.answers.nodes as answer}
        <article>
          <header>
            <div class="meta-text">
              <!-- <span class="answer-id">{answer.id}</span> -->
              <span class="author-name">{answer.author.firstName} {answer.author.lastName}</span>
              answered <span class="meta-date">{dateFormat(answer.createdDate)}</span>
            </div>
          </header>
          {#if editAnswerId == answer.id}
            <EditAnswer answerId={answer.id} on:answerClosed={handleAnswerClosed}/>
          {:else}

            <div class="answer-text">
              <Content output={answer.answer} />
            </div>
          {/if}
          <div class="answer-actions">
            <button on:click|preventDefault={() => btnDeleteAnswerClick(answer.id)}>Delete</button>
            <button on:click|preventDefault={() => btnEditAnswerClick(answer.id)}>Edit</button>
          </div>
        </article>
      {/each}
    </article>
  {/if}  
</main>