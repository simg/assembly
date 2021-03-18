<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import Paragraph from '@editorjs/paragraph'; 


export let editorId = 'editorjs'; 
export let content : EditorJS.OutputBlockData[]  = [];

let editor;

onMount(async ()=> {
  editor = new EditorJS({ 
    holder: editorId,
    autofocus: true,
    tools: { 
      header: {
        class: Header,
        //inlineToolbar: ['link', 'marker', 'bold', 'italic'],
      },
      list: List,
      paragraph: Paragraph
    }, 
    data: { blocks:content},
    onChange: () => {
      editor.save().then(outputData => {
        content = outputData.blocks;
      })
    }
  })
});

onDestroy(() => {
  // sometimes the editor can already have been removed by the time
  // we get here, which causes an error.
  if (editor && editor.destroy) {
    editor.destroy();
  } 
})

</script>

<div id="{editorId}"></div>