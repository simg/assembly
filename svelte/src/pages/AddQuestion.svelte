<script lang="ts">

  import { createEventDispatcher } from 'svelte';
  import { form as svelteForm, bindClass } from 'svelte-forms';
  import { navigate } from 'svelte-routing';
  import { operationStore, query, mutation } from '@urql/svelte';

  const dispatch = createEventDispatcher();

  export let question: string = '';
  export let details: string = '';

  const myForm = svelteForm(() => ({
    question: { value: question, validators: ['required'] },
    details: { value: details, validators: [] }
  }));  

  // TODO: find out why $details breaks with just type String rather than String!
  const addQuestionMutation = mutation(operationStore(`
      mutation ($question : String!, $details : String!) {
        addQuestion(input: {question: $question, details: $details}) {
          clientMutationId
          question {
            id
          }
        }
      }
    `));

  function btnAddQuestionClick() {
    addQuestionMutation({question: question, details:details }).then((res) => {
      console.log("addQuestionRes", res.data.addQuestion.question.id)
      dispatch('questionAdded', {});  
      navigate(`/question/${res.data.addQuestion.question.id}`);
    });
  }

</script>

<style>
  section.question-edit {
    border:1px solid #eee;
  }

  form {
    padding:15px;
  }

  textarea {
    display:block;
    width:100%;
  }
</style>

<section class="question-edit">
  <form>
    <label for="question">Question</label>
    <textarea name="question" rows="3" bind:value={question} use:bindClass={{ form: myForm }} />

    <label for="details">Question Details</label>
    <textarea name="details" rows="3" bind:value={details} use:bindClass={{ form: myForm }} />
    <div class="Question-edit-actions">
      <button disabled="{!$myForm.valid}" on:click|preventDefault={btnAddQuestionClick}>Ask question</button>
    </div>
  </form>
</section>