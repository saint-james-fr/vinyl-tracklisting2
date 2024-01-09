<script lang="ts">
  import { vinylStore } from "stores";
  import { createDefaultSide } from "lib/default";
  import swal from "sweetalert";
  import { sweetAlertOptionsError } from "lib/sweet_alert";
  let add_sides = "Add Faces C/D";
  $: {
    if ($vinylStore.sides.length == 2) {
      add_sides = "Add Faces C/D";
    } else if ($vinylStore.sides.length == 4) {
      add_sides = "Add Faces E/F";
    } else if ($vinylStore.sides.length == 1) {
      add_sides = "Add Face B";
    }
  }

  const handleClick = () => {
    if ($vinylStore.sides.length == 6)
      return swal("Sorry, you can't add more sides.", sweetAlertOptionsError);
    if ($vinylStore.sides.length == 1) {
      $vinylStore.sides = [...$vinylStore.sides, createDefaultSide()];
    } else {
      $vinylStore.sides = [...$vinylStore.sides, createDefaultSide()];
      $vinylStore.sides = [...$vinylStore.sides, createDefaultSide()];
    }
  };
</script>

<div
  class="home-secondary-button bigger-text centrer app__button"
  on:click={handleClick}
  id="add_button"
  class:hide={$vinylStore.sides.length == 6}
>
  <i class="fa-regular fa-square-plus"></i>
    {add_sides}
</div>

<style lang="scss">
  #add_button {
    transition: 300 linear opacity;
    opacity: 1;
  }

  #add_button.hide {
    opacity: 0.2;
    pointer-events: none;
  }
</style>
