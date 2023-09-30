{#if showImageChooser}
  <ImageChooser />
{/if}

<div class="container">
  <div class="canvas-container">
    <img src="/Splash-left-seal.png" alt="Left Seal" class="left-seal"/>
    <canvas bind:this={canvas} width="1024" height="1024" on:click={handleCanvasClick}></canvas>
    <img src="/Splash-right-seal.png" alt="Right Seal" class="right-seal"/>
  </div>
</div>
<div class="color-picker">
  <input type="color" value={`#${color.map(c => c.toString(16).padStart(2, '0')).join('')}`} on:input={setColor} />
  <UndoButton on:undo={undo} />
  <button class="toggle-button" on:click={toggleImageChooser}>
    Load Image!
  </button>
  <div class="color-grid">
    {#each pastelColors as { color, hex } (hex)}
      <button class="color-button" style="background-color: {hex};" on:click={() => selectColor(color)}></button>
    {/each}
  </div>
</div>

<script>
  import { onMount } from 'svelte';
  import { floodfill } from '../paint-utils/floodfill';
  import { pastelColors } from '../paint-utils/pastelcolors';
  import UndoButton from './UndoButton.svelte';
  import ImageChooser from './ImageChooser.svelte';
  

  let canvas;
  let ctx;
  let color = [0, 255, 0];
  let history = [];
  let showImageChooser = false;

  function toggleImageChooser() {
    showImageChooser = !showImageChooser;
  }

  function getCanvasData() {
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  function setCanvasData(imageData) {
    ctx.putImageData(imageData, 0, 0);
  }

  function undo() {
    if (history.length > 0) {
      setCanvasData(history.pop());
    }
  }

  function selectColor(newColor) {
    color = newColor;
  }

  function setColor(event) {
    const newHexColor = event.target.value;
    color = [
      parseInt(newHexColor.slice(1, 3), 16),
      parseInt(newHexColor.slice(3, 5), 16),
      parseInt(newHexColor.slice(5, 7), 16),
    ];
  }

  function handleCanvasClick(e) {
    history.push(getCanvasData());

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const rgba = imageData.data;

    floodfill(rgba, canvas.width, canvas.height, x, y, color);
    ctx.putImageData(imageData, 0, 0);
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    let image = new Image();
    let imageSrc = '/images/swimming-guy.png';
    image.src = imageSrc;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.onerror = () => {
      console.error('Failed to load image');
    };
  });
</script>
  
  <style>
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #00AEEF;
    }
    canvas {
      border: 1px solid #000;
      border-radius: 10px;
      display: block;
    }

    .color-picker {
      margin-top: 10px;
      width: 100%;
      margin: auto;
      border: 5px solid;
      border-color: #F47213; /* F47213 */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;      
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(25px, 1fr));
      gap: 5px;
      margin-top: 5px;
    }

    @media (min-width: 600px) {
      .color-grid {
        grid-template-columns: repeat(8, 55px);
      }
    }

    .color-button {
      width: 50px;
      height: 25px;
      border: none;
      cursor: pointer;
    }
  
  .canvas-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  canvas {
    flex-grow: 1;
    max-width: 100%;
    height: auto;
    min-width: 200px; /* Adjust minimum width as needed */
  }

  .left-seal, .right-seal {
    width: 25%; /* Original width of the seals */
    height: auto;
    flex-shrink: 2; /* Prevents the seals from shrinking */
  }

  @media (max-width: 480px) {
    .left-seal, .right-seal {
      display: none;
    }
  }

  .toggle-button {
    background-color: #00AEEF;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
  }
  </style>
