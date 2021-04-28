<script lang="ts">
import type { OutputData, OutputBlockData } from '@editorjs/editorjs';

export let output : OutputBlockData[] = [];

//TODO: make sure html is sanitised properly
</script>

<style>
  P:last-child {
    margin-bottom:0;
  }
</style>



{#if Array.isArray(output) }
  {#each output as block }
    {#if (block.type == 'paragraph')}
      <p>{@html block.data.text}</p>
    {:else if (block.type == 'heading')}
      <h1>{JSON.stringify(block.data)}</h1>
    {:else}
      <div>{JSON.stringify(block)}</div>
    {/if}
  {/each}
{:else}
  {JSON.stringify(output)}
{/if}