<script lang="ts">
  import { vinylStore } from "stores";
  import { sortArraysClosestSum } from "lib/sort";
  import { tracksAreValid } from "lib/validate";
  import { sweetAlertOptionsError, sweetAlertOptionsSuccess } from "lib/sweet_alert";
  import swal from "sweetalert";

  const handleClick = () => {
    // we need to sort each side of the vinyl
    if ($vinylStore.sides.length == 1)
      return swal(
        "You need at least two sides to use the sort function.",
        sweetAlertOptionsError
      );
    for (let i = 0; i < $vinylStore.sides.length; i += 2) {
      const tracksA = $vinylStore.sides[i].tracks;
      const tracksB = $vinylStore.sides[i + 1].tracks;
      // we validate tracks or throw an error
      try {
        tracksAreValid(tracksA);
        tracksAreValid(tracksB);
      } catch (error: any) {
        return swal(error.message, sweetAlertOptionsError);
      }
      // we sort tracks
      const { resultArr1, resultArr2 } = sortArraysClosestSum(tracksA, tracksB);
      // we update store to regenerate ui
      $vinylStore.sides[i].tracks = resultArr1;
      $vinylStore.sides[i + 1].tracks = resultArr2;
      // We send a message to the user
      swal(
        "Tracks have been sorted.\nIf you'd like to, you can now save your audio and release informations and generate your PDF.",
        sweetAlertOptionsSuccess
      );
    }
  };
</script>

<!-- disable A1 -->
<div
  id="sort"
  class="home-secondary-button bigger-text centrer app__button uppercase"
  on:click={handleClick}
>
  <i class="fa-solid fa-right-left"></i>  Sort
</div>
