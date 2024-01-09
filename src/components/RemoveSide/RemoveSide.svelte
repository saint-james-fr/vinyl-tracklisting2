<script lang="ts">
  import { vinylStore } from "stores";
  import swal from "sweetalert";
  import { sweetAlertOptionsError } from "lib/sweet_alert";
  let remove = "Remove Side B";
  $: {
    if ($vinylStore.sides.length == 2) {
      remove = "Remove Side B";
    } else if ($vinylStore.sides.length == 4) {
      remove = "Remove Sides C/D";
    } else if ($vinylStore.sides.length == 6) {
      remove = "Remove Sides E/F";
    }
  }
  const handleClick = () => {
    if ($vinylStore.sides.length == 1)
      return swal(
        "You need at least one side to use this tool.",
        sweetAlertOptionsError
      );

    const sides = [...$vinylStore.sides];
    if ($vinylStore.sides.length == 2) {
      sides.pop();
    } else {
      sides.pop();
      sides.pop();
    }
    $vinylStore.sides = sides;
  };
</script>

<div
  class="home-secondary-button bigger-text centrer app__button uppercase"
  id="remove_button"
  on:click={handleClick}
  class:hide={$vinylStore.sides.length == 1}
>
  <i class="fa-solid fa-eraser"></i>
    {remove}
</div>

<style lang="scss">
  #remove_button {
    transition: 300ms linear opacity;
    opacity: 1;
  }

  #remove_button.hide {
    opacity: 0.2;
    pointer-events: none;
  }
</style>
