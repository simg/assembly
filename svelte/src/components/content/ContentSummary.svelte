<script lang="ts">
  import * as _ from 'lodash';

  import type { OutputBlockData } from '@editorjs/editorjs';
  
  export let output : OutputBlockData[] = []

  const content = Array.isArray(output) ? 
                    _.get(output.find(block => block.type === 'paragraph'), 'data.text')
                    : output;
  
</script>
  
{#if content }
  <p>{content}</p>
{/if}