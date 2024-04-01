<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import modal from "lib/modal";

  onMount(() => {
    modalInstance = modal("flex");
    modalInstance.handleButtonClick(modalElement);
  });

  onDestroy(() => {
    modalInstance.handleCloseClick(modalElement);
  });

  let modalInstance: {
    handleButtonClick: (modalElement: HTMLDivElement) => void;
    handleCloseClick: (modalElement: HTMLDivElement) => void;
    outsideClick: (modalElement: HTMLDivElement, e: MouseEvent) => void;
  };

  let modalElement: HTMLDivElement;
</script>

<div id="spinner_modal" bind:this={modalElement}>
  <div id="column">
    <div id="loading"></div>
    Loading Tracks...
  </div>
</div>
<svelte:window on:click={(e) => modalInstance.outsideClick(modalElement, e)} />

<style lang="scss">
  #spinner_modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.75rem;
  }

  #column {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  #loading {
    display: inline-block;
    width: 75px;
    height: 75px;
    border: 5px solid var(--color-orange);
    border-radius: 50%;
    border-top-color: var(--color-white);
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
