<script lang="ts">
  import { vinylStore } from "stores";
  import swal from "sweetalert";
  import { sweetAlertOptionsError } from "lib/sweet_alert";
  const handleClick = () => {
    if ($vinylStore.sides.length == 1) return swal("You need at least one side to use this tool.", sweetAlertOptionsError);

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
  class="home-secondary-button bigger-text centrer app__button"
  on:click={handleClick}
>
  <i class="fa-solid fa-eraser"></i>  Remove sides
</div>
