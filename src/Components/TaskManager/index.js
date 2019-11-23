import React, {useEffect} from 'react';

function TaskManager(...props){
  useEffect(()=>{
    console.log("hello taskmanager")
  },[])
  console.log(props)
  return(
   
  )
}


export default TaskManager;