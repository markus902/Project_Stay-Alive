import React, {useEffect} from 'react';

function TaskManager(...props){
  useEffect(()=>{
    console.log("hello taskmanager")
  },[])
  console.log(props)
  return(
    <div>
      <h1>TaskManager</h1>
    </div>
  )
}


export default TaskManager;