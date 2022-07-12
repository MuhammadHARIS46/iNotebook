import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const s1 = {
    name: "Haris",
    class: "undergraduate",
  };
  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "Umer",
        class: "3rd year",
      });
    }, 1000);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>
      _{props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
