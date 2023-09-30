<!-- UndoButton.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    function handleUndo() {
      dispatch('undo');
    }
  </script>
  
  <style>
    .undo-button {
      width: 40px;
      height: 40px;
      border: none;
      background-color: transparent;
      cursor: pointer;
      outline: none;
      padding: 5px;
    }
  
    .undo-button:hover {
      background-color: #eee;
    }
  
    .undo-icon {
      fill: #333;
    }
  
    .undo-button:active .undo-icon {
      fill: #666;
    }
  </style>
  
  <button class="undo-button" on:click={handleUndo}>
    <svg class="undo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6H4c0 4.41 3.59 8 8 8s8-3.59 8-8s-3.59-8-8-8z"/>
    </svg>
  </button>
  