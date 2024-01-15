const blockOverflow = () => {
  document.body.style.overflow = "hidden";
};

const unblockOverflow = () => {
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "auto";
};

const modal = () => {
  return {
    handleButtonClick: (modal: HTMLDivElement) => {
      modal.style.display = "block";
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
