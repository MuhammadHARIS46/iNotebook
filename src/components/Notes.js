import React ,{useContext} from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';

const Notes = () => {
    const context=useContext(noteContext);
    const {notes,setNotes}=context;
  return (
    <div classNameName="row my-3">
    <h2>your Notes</h2>
    {notes.map((note)=>{
      return <NoteItem note ={note}/>
    })}
  </div>
  );
}

export default Notes;
