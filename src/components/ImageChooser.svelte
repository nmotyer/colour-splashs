<script>
    import { onMount } from 'svelte';
    import { selectedImage } from './store.js';
    
    let thumbnails = [];
    let currentPage = 1;
    const thumbnailsPerPage = 6;
    
    onMount(async () => {
      const response = await fetch('/thumbnails');
      if (response.ok) {
        console.log(response)
        thumbnails = await response.json();
      }
    });
    
    function goNext() {
      if (currentPage < Math.ceil(thumbnails.length / thumbnailsPerPage)) currentPage++;
    }
    
    function goPrevious() {
      if (currentPage > 1) currentPage--;
    }

    function selectImage(thumbnail) {
      selectedImage.set(`/images/${thumbnail}`);
    }
  </script>
  
  <style>
    .image-chooser {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      border: 2px solid #00AEEF;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
    
    .thumbnails {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      justify-content: center;
      align-items: center;
    }
    
    .thumbnail {
      max-width: 100%;
      max-height: 100%;
      border: 2px solid #F47213;
      border-radius: 5px;
    }
    
    .pagination {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .button {
      background-color: #00AEEF;
      color: white;
      padding: 5px 10px;
      margin: 0 5px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    
    .button:disabled {
      background-color: #b4e1ff;
      cursor: not-allowed;
    }
  </style>
  
  <div class="image-chooser">
    <div class="thumbnails">
      {#each thumbnails.slice((currentPage - 1) * thumbnailsPerPage, currentPage * thumbnailsPerPage) as thumbnail}
        <img src={`/images/thumbs/${thumbnail}`} alt="Thumbnail" class="thumbnail" on:click={() => selectImage(thumbnail)} />
      {/each}
    </div>
    <div class="pagination">
      <button class="button" on:click={goPrevious} disabled={currentPage === 1}>Previous</button>
      <button class="button" on:click={goNext} disabled={currentPage === Math.ceil(thumbnails.length / thumbnailsPerPage)}>Next</button>
    </div>
  </div>
  