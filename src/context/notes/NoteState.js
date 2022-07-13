import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const notesInitial=[
    
      {
        "_id": "62cf15d9ab833b8317d53aa9",
        "user": "62bf39ca616869ba9e8b862a",
        "title": "aye dil ha mushkil",
        "description": "mujhko satati ha teri kami ",
        "tag": "my first note",
        "date": "2022-07-13T18:58:33.114Z",
        "__v": 0
      },
      {
        "_id": "62cf16d7ab833b8317d53aad",
        "user": "62bf39ca616869ba9e8b862a",
        "title": "aye dil ha mushkil",
        "description": "mujhko satati ha teri kami ",
        "tag": "my first note",
        "date": "2022-07-13T19:02:47.296Z",
        "__v": 0
      },
      {
        "_id": "62cf16d8ab833b8317d53aaf",
        "user": "62bf39ca616869ba9e8b862a",
        "title": "aye dil ha mushkil",
        "description": "mujhko satati ha teri kami ",
        "tag": "my first note",
        "date": "2022-07-13T19:02:48.232Z",
        "__v": 0
      }
   
  ]
  const [notes, setNotes] = useState(notesInitial);

 
  return (
    <NoteContext.Provider value={{ notes,setNotes }}>
      _{props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
