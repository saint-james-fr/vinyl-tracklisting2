import Sortable from "sortablejs";
import { vinylStore } from "stores";
import { prefixTranslation } from "./prefix";

// change of ui triggered by on end => modify sort array of vinyl.sides
//prevent emptyside

const getSideIndex = (sideElement: HTMLElement): number | undefined => {
  const id = sideElement.id;
  const pattern = /side(.)/;
  const match = id.match(pattern);
  if (match) {
    return prefixTranslation.get(match[1]);
  } else return undefined;
};

export const createSortableSide = (sideElement: HTMLElement): void => {
  // Clean first
  if (Sortable.get(sideElement)) {
    Sortable.get(sideElement)?.destroy();
  }
  Sortable.create(sideElement, {
    animation: 150,
    swapThreshold: 1,
    handle: ".handle-function",
    group: "shared",
    selectedClass: "highlight",
    fallbackTolerance: 3,
    direction: "horizontal",
    ghostClass: "sortable-ghost",
    onAdd: (e) => {
      const fromSideIndex = getSideIndex(e.from);
      const toSideIndex = getSideIndex(e.to);

      // We update the store
      vinylStore.update((storeValue) => {
        // Check if the side indices are defined
        if (fromSideIndex === undefined || toSideIndex === undefined)
          return storeValue;

        // Remove the track from the original side
        const [track] = storeValue.sides[fromSideIndex].tracks.splice(
          e.oldDraggableIndex,
          1
        );

        storeValue.sides[toSideIndex].tracks.splice(
          e.newDraggableIndex,
          0,
          track
        );

        return storeValue;
      });
    },
    onUpdate: (e) => {
      // update
      const sideIndex = getSideIndex(e.from);
      if (sideIndex === undefined) return;

      vinylStore.update((storeValue) => {
        const side = storeValue.sides[sideIndex];
        const [track] = side.tracks.splice(e.oldDraggableIndex, 1);
        side.tracks.splice(e.newDraggableIndex, 0, track);
        return storeValue;
      });
    },
  });
};
