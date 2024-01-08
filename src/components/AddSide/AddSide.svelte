<script lang="ts">
  import { vinylStore } from "stores";
  import { createDefaultSide } from "lib/default";
  import swal from "sweetalert";
  import { sweetAlertOptionsError } from "lib/sweet_alert";

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
>
  <i class="fa-regular fa-square-plus"></i>  Add sides
</div>
