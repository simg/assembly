<script lang="ts">

  import { createEventDispatcher } from 'svelte';
  import { form as svelteForm, bindClass } from 'svelte-forms';
  import { operationStore, query, mutation } from '@urql/svelte';
  import * as _ from 'lodash';

  import Editor from '../content/Editor.svelte';

  const dispatch = createEventDispatcher();
    
  let comment : string = '';

  function btnCancelClick() {
    dispatch('cancelled', {});
  }

  function btnAddCommentClick() {
    dispatch('addComment', {comment})
  }

  const myForm = svelteForm(() => ({
    comment: { value: comment, validators: ['required'] }
  }));  

</script>

<style>
  section.add-comment {
    border:1px solid #eee;
  }


  form {
    padding:15px;
  }

</style>

<section class="add-comment">
  <form>
    <Editor editorId="add-comment" bind:content={comment} />
    <div class="actions">
      <button disabled="{!$myForm.valid}" on:click|preventDefault={btnAddCommentClick}>Add Comment</button>
      <button on:click|preventDefault={btnCancelClick}>Cancel</button>
    </div>
  </form>
</section>