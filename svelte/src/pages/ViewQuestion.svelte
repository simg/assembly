<script lang="ts">

  import * as _ from 'lodash';
  import { onMount }  from 'svelte';

  import { Link } from "svelte-routing";
  import EditAnswer from '../components/answer/EditAnswer.svelte';
  import Content from '../components/content/Content.svelte';

  import { dateFormat } from '../lib/dateHelpers';
      
  import { operationStore, query, mutation } from '@urql/svelte';
  import QuestionComments from '../components/question/QuestionComments.svelte';
  import AnswerComments from '../components/answer/AnswerComments.svelte';
  import ShowComment from '../components/comment/ShowComment.svelte';

  import { fetchQuestions } from './question.store';

  export let questionId;
  export let userId = '1';

  let showAddAnswer = false;
  let editAnswerId : string | undefined;
  let showQuestionComments = false;

  const questionParameters = {
    cacheBuster : 0,
    questionId: questionId,
    userId: userId
  }
  
  let question = fetchQuestions(questionParameters);

  const followQuestionMutation = mutation(operationStore(`
      mutation ($questionId : BigInt!) {
          questionFollow(input: {questionId: $questionId}) {
            clientMutationId
          }
        }
    `));

  const unfollowQuestionMutation = mutation(operationStore(`
    mutation ($questionId : BigInt!) {
        questionUnfollow(input: {questionId: $questionId}) {
          clientMutationId
        }
      }
  `));    

  const deleteAnswerMutation = mutation(operationStore(`
    mutation MyMutation($answerId: BigInt!) {
      answerDelete(input: {answerId: $answerId}) {
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

  function btnShowCommentsToggleClick($event) {
    showQuestionComments = !showQuestionComments;
  }

  function btnShowAnswerCommentsToggleClick(answer) {
    console.log("answer", answer)
    answer.showComments = !answer.showComments;
    console.log("question", question)
    question = question; //svelte reactivity hack. 
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


{#if $question.fetching} 
<p>Loading...</p>
{:else if $question.error}
<p class="error">Oh no... {$question.error.message}</p>
{:else}
  <article class="question-body question-{ question.data.question.id }">
    <h2>{question.data.question.question}</h2>
    <div class="question-actions">
      <button class="btn btn-answer" on:click={btnAddAnswerClick}>Answer</button>
      <button class="btn btn-follow" on:click={() => toggleFollowQuestionClick(question.data.question.isUserFollowing.totalCount > 0)}>
        { question.data.question.isUserFollowing.totalCount > 0 ? 'Unfollow' : 'Follow'}
        . {question.data.question.questionFollowers.totalCount}</button>
      <button class="btn btn-comments"on:click={btnShowCommentsToggleClick}><span class="text">Comments . </span><span class="count">{question.data.question.questionComments.totalCount}</span></button>
      <button class="btn btn-downvote"><span class="text">Downvote</span></button>
      <button class="btn btn-share"><span class="text">Share</span></button>
      <button class="btn btn-options"><span class="text">More options</span></button>
    </div>
    {#if showQuestionComments }
        <QuestionComments questionId={question.data.question.id} />
    {/if}
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
            <div class="author-name">{answer.author.firstName} {answer.author.lastName}</div>
            <div>answered <span class="meta-date">{dateFormat(answer.createdDate)}</span></div>
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
          <button class="btn btn-comments"on:click={() => btnShowAnswerCommentsToggleClick(answer)}><span class="text">Comments . </span><span class="count">{answer.commentCount}</span></button>
          <button on:click|preventDefault={() => btnDeleteAnswerClick(answer.id)}>Delete</button>
          <button on:click|preventDefault={() => btnEditAnswerClick(answer.id)}>Edit</button>
        </div>

        {#if answer.showComments}
          <AnswerComments answerId={answer.id}></AnswerComments>
        {/if}        
      </article>
    {/each}
  </article>
{/if}  
