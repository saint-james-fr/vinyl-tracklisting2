const blockOverflow = () => {
  document.body.style.overflow = "hidden";
};

const unblockOverflow = () => {
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "auto";
};

const modal = (
  display?:
    | "block"
    | "flex"
    | "grid"
    | "none"
    | "inline"
    | "inline-block"
    | "inline-flex"
    | "inline-grid"
    | "table"
    | "table-row"
    | "table-cell"
) => {
  return {
    handleButtonClick: (modal: HTMLDivElement) => {
      modal.style.display = display || "block";
      blockOverflow();
    },

    handleCloseClick: (modal: HTMLDivElement) => {
      modal.style.display = "none";
      unblockOverflow();
    },

    outsideClick: (modal: HTMLDivElement, event: MouseEvent) => {
      if (event.target == modal) {
        modal.style.display = "none";
        unblockOverflow();
      }
    },
  };
};

export default modal;
