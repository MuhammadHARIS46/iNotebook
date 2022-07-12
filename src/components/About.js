import React from 'react';
import noteContext from '../context/notes/noteContext';
import { useEffect,useContext } from 'react';


const About = () => {
  const a=useContext(noteContext);
  useEffect(() => {
   a.update();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      This is {a.state.name} and he is in class {a.state.class}
    </div>
  );
}

export default About;