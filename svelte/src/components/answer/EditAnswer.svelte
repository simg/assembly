<script lang="ts">

  import { createEventDispatcher } from 'svelte';
  import { form as svelteForm, bindClass } from 'svelte-forms';
  import { operationStore, query, mutation } from '@urql/svelte';
  import * as _ from 'lodash';

  import Editor from '../content/Editor.svelte';

  const dispatch = createEventDispatcher();

  export let questionId : string | undefined;
  export let answer: any = [];
  export let answerId: string | undefined;
  export let error:any | undefined;

  const fetchAnswerParams = {
    cacheBuster : 0,
    answerId : answerId
  } 

  const fetchAnswerQuery = operationStore(`
      query ($answerId : BigInt!) {
        answer(id: $answerId) {
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
          commentCount
        }
      }
    `, fetchAnswerParams, { requestPolicy: 'network-only' });    

  if (answerId) {
    query(fetchAnswerQuery).subscribe(res => {
      if (res.data) {
        answer = res.data.answer.answer;
      }
    });
  }

  const addAnswerMutation = mutation(operationStore(`
      mutation ($questionId: BigInt!, $answer: JSON!) {
        addAnswer(input: {questionId : $questionId, answer: $answer }) {
          clientMutationId
        }
      }
    `));

    const updateAnswerMutation = mutation(operationStore(`
      mutation ($answerId: BigInt!, $answer: JSON!) {
        updateAnswer(input: {answerId : $answerId, answer: $answer }) {
          answer {
            id
            answer
          }
          clientMutationId
        }
      }
    `));
    
  function refreshAnswer() {
    fetchAnswerParams.cacheBuster++;
    $fetchAnswerQuery.variables = _.clone(fetchAnswerParams);    
  }    

  function btnSaveAnswerClick() {
    if (answerId) {
      updateAnswerMutation({answerId: answerId, answer : answer}).then(res => {
        if (res.error) {
          error = res.error;// TODO: something better than this
        } else {
          refreshAnswer();
          dispatch('answerClosed', {});
        }
      });
    } else {
      addAnswerMutation({questionId: questionId, answer : answer}).then(res => {
        if (res.error) {
          error = res.error;// TODO: something better than this
        } else {
          refreshAnswer();
          dispatch('answerClosed', {});  
        }
      });
    }

  }

  function btnCancelAnswerClick() {
    dispatch('answerClosed', {});
  }

  const myForm = svelteForm(() => ({
    answer: { value: answer, validators: ['required'] }
  }));  

</script>

<style>
  section.answer-edit {
    border:1px solid #eee;
  }

  header {
    background:#eee;
    padding:15px;
    height:30px;
  }

  form {
    padding:15px;
  }

</style>

<section class="answer-edit">
  {#if error}
    <div class="error">{error}</div>
  {/if}

  {#if answerId && $fetchAnswerQuery.fetching}
    <p>Loading...</p>
  {:else if answerId && $fetchAnswerQuery.error}
    <p class="error">Oh no... {$fetchAnswerQuery.error.message}</p>
  {:else }  
  <header>

  </header>
  <form>
    {#if (!answerId)}
      <Editor editorId="answer" bind:content={answer} />
    {:else}
      {#if $fetchAnswerQuery.fetching}
        <p>Loading...</p>
      {:else if $fetchAnswerQuery.error}
        <p class="error">Oh no... {$fetchAnswerQuery.error.message}</p>
      {:else if ($fetchAnswerQuery.data) }
        <Editor editorId="answer-{answerId}" bind:content={answer} />
      {/if}
    {/if}
    
    <div class="answer-edit-actions">
      <button disabled="{!$myForm.valid}" on:click|preventDefault={btnSaveAnswerClick}>Publish</button>
      <button disabled="{!$myForm.valid}" on:click|preventDefault={btnSaveAnswerClick}>Save Draft</button>
      <button on:click|preventDefault={btnCancelAnswerClick}>Cancel</button>
    </div>
  </form>

  {/if}
</section>