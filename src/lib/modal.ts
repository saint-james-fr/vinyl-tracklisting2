const modal = () => {
  return {
    handleButtonClick: (modal: HTMLDivElement) => {
      modal.style.display = "block";
    },

    handleCloseClick: (modal: HTMLDivElement) => {
      modal.style.display = "none";
    },

    outsideClick: (modal: HTMLDivElement, event: MouseEvent) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    },
  };
};

export default modal;
