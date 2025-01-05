import React from "react";

type HeaderProps = {
  addRect: (type: "square", name: string, color: string) => void;
  removeSelectedShape: () => void;
  handleExport: () => void;
  selectedId: string | null;
};

const Header: React.FC<HeaderProps> = ({
  addRect,
  removeSelectedShape,
  handleExport,
  selectedId,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isopenLegend, setIsOpenLegend] = React.useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const openForm = (): void => setIsOpen((prevState) => !prevState);
  const openLegend = (): void => setIsOpenLegend((prevState) => !prevState);
  const openMenuButton = (): void => setIsMenuOpen((prevState) => !prevState);

  return (
    <div className="header-component">
      <button onClick={openForm}>Instruction</button>
      {isOpen && (
        <form className="instruction">
          <p>You can add new room by clicking '+' button</p>
          <p>You can remove room by clicking on it and then clicking remove</p>
          <p>You can drag room on the canvas by holding the mouse on it</p>
          <p>You can see the legend by clicking 'Legend' button</p>
          <p>You can download your flat by clicking 'Download' button</p>
        </form>
      )}
      <button onClick={openLegend}>Legend</button>
      {isopenLegend && (
        <form className="legend">
          <p>Corridor - Gray</p>
          <p>Living room - Red</p>
          <p>Kitchen - Orange</p>
          <p>Bathroom - Blue</p>
          <p>Office - Green</p>
          <p>Bedroom - Yellow</p>
        </form>
      )}
      <button onClick={openMenuButton}>+</button>
      {isMenuOpen && (
        <menu>
          <button onClick={() => addRect("square", "LivingRoom", "red")}>
            Living Room
          </button>
          <button onClick={() => addRect("square", "Corridor", "gray")}>
            Corridor
          </button>
          <button onClick={() => addRect("square", "Bedroom", "yellow")}>
            Bedroom
          </button>
          <button onClick={() => addRect("square", "Kitchen", "orange")}>
            Kitchen
          </button>
          <button onClick={() => addRect("square", "Bathroom", "blue")}>
            Bathroom
          </button>
          <button onClick={() => addRect("square", "Office", "green")}>
            Office
          </button>
        </menu>
      )}
      <button onClick={removeSelectedShape} disabled={!selectedId}>
        Remove
      </button>
      <button onClick={handleExport}>Export</button>
    </div>
  );
};

export default Header;
