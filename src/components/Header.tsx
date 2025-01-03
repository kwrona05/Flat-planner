import React, { useState } from "react";
import "../App.css";
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isopenLegend, setIsOpenLegend] = useState<boolean>(false);

  const openForm = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  const openLegend = (): void => {
    setIsOpenLegend((prevState) => !prevState);
  };
  return (
    <div>
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
      {/*remove button*/}
      {/*download button*/}
      {/*add button*/}
    </div>
  );
};
export default Header;
