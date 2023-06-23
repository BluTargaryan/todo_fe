import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import React, {useState, useEffect} from "react";
import styled from "styled-components";
//images
import bgimg from '../images/registerpgimg.jpg' 
import logo from '../images/logo.png' 

const mainColor = "#92B6D5";
const buttonColor = "#F9F9F9"
const hoverColor = "#678096"

const critPriorityColor = "#D14A4A"
const highPriorityColor = "#D19B4A"
const mediumPriorityColor = "#CED075"
const lowPriorityColor = "#B9D3AA"

const Home = () =>{
  //states for add task form data
  const [taskTitle, setTaskTitle] = useState('');
const [taskDateTime, setTaskDateTime] = useState('');
const [selectedPriority, setSelectedPriority] = useState("High");
const [imageUrl, setImageUrl] = useState('');

  //states for edit task form data
  const [etaskTitle, eSetTaskTitle] = useState('');
  const [etaskDateTime, eSetTaskDateTime] = useState('');
const [eselectedPriority, eSetSelectedPriority] = useState("High");
const [eimageUrl, eSetImageUrl] = useState('');

//states for subtask form
const [subTaskTitle, setSubTaskTitle] = useState('')

//states for edit subtask form
const [esId, setESId] = useState('')
const [esTitle, setESTaskTitle] = useState('')


//func to update task priority
const updTaskPriority = (id, priority, title, image, datetime) =>{

  const updatedTask = {
    userId: userId,
    priority: String(priority),
    title: title,
    imageUrl:image,
    expectedDateTime: new Date(datetime),
    isCompleted: false
  };
  editTask(id, updatedTask);
// console.log(updatedTask)
}

//state for useLocation
const { state } = useLocation();
const userId = state && parseInt(state.userId);

//state to display editTask menu

const [editMenuVisible, setEditMenuVisible] = useState(false)

//state to display addSubTask menu

const [addSubVisible, setAddSubVisible] = useState(false)

//state to display editSubTask menu

const [editSubVisible, setEditSubVisible] = useState(false)

//method to make editMenu visible as well as hinder scroll
const editMenuVisibility = (id,title,priority,image) =>{
eSetTaskTitle(title)
eSetSelectedPriority(priority)
eSetImageUrl(image)
setTaskId(id)

  setEditMenuVisible(true)
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";
}

//to reverse editMenu func
const revEditMenuVisibility = () =>{
  setEditMenuVisible(false)
  document.body.style.overflow = "auto";
}


    //default image
    const [img, setImg] =useState(bgimg)
    //state to enable addtask view
    const [addTaskVisible, setAddTaskVisible] = useState(false);
    const options = [
        { value: 'Critical', label: 'Critical' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
      ];

      //main add task engine
      const addTask = (newTask) => {
        fetch("http://localhost:8080/task/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        })
          .then((res) => res.json())
          .then((result) => {
            // Handle the result if needed
            console.log(result);
            // Update the tasks list with the newly added task
            setTasks([...tasks, result]);
          })
          .catch((error) => {
            // Handle errors if any
            console.error("Error adding task:", error);
          });
      };
      //add task handle
      const handleAddTask = (e) => {
        e.preventDefault();
        const newTask = {
          userId:userId,
          priority:String(selectedPriority),
          title: taskTitle,
          imageUrl: imageUrl,
          expectedDateTime:new Date(taskDateTime),
          isCompleted:false
        };
        addTask(newTask);
        setAddTaskVisible(false)
        window.location.reload();
      };


//add subtask handle

      const addSubTask = (newSubTask) => {
        fetch("http://localhost:8081/subtask/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubTask),
        })
          .then((res) => res.json())
          .then((result) => {
            // Handle the result if needed
            console.log(result);
            // Update the tasks list with the newly added task
            setSubTasks([...subtasks, result]);
          })
          .catch((error) => {
            // Handle errors if any
            console.error("Error adding subtask:", error);
          });
      };

      
      const handleAddSubTask = (e, id, title) => {
        e.preventDefault();
        const newSubTask = {
          taskId: id,
          title:title,
          completed:false
        };
        addSubTask(newSubTask);
        setAddSubVisible(false)
        window.location.reload();

        // console.log(newSubTask)
      };
      // main edit task engine
const editTask = (taskId, updatedTask) => {
  fetch(`http://localhost:8080/task/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  })
    .then((res) => res.json())
    .then((result) => {
      // Handle the result if needed
      console.log(result);
      // Update the tasks list with the edited task
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return result;
        }
        return task;
      });
      setTasks(updatedTasks);
    })
    .catch((error) => {
      // Handle errors if any
      console.error("Error editing task:", error);
    });
};

//state for taskId
const [taskId, setTaskId] = useState(0)
// edit task handle
const handleEditTask = (e) => {
  e.preventDefault();
  const updatedTask = {
    userId: userId,
    priority: String(eselectedPriority),
    title: etaskTitle,
    imageUrl: eimageUrl,
    expectedDateTime: new Date(etaskDateTime),
    isCompleted: false
  };
  editTask(taskId, updatedTask);
  setEditMenuVisible(false);
  window.location.reload();
};

//to update task completion
const editTaskCompleted = (id,priority,title,image,date, check) =>{
 
  const updatedTask = {
    userId:userId,
    priority:priority,
    title: title,
    imageUrl: image,
    expectedDateTime:new Date(date),
    completed:(!check)
  };
  editTask(id, updatedTask);
  // window.location.reload();
  // console.log(updatedTask)
}

//to update subtask completion
const editSubTaskCompleted = (taskId, id, title, check)=>{
  setTaskId(taskId)

  setESTaskTitle(title)
  const updatedSubTask = {
    taskId: taskId,
    title:title,
    completed:!check
  };
  editSubTask(id, updatedSubTask);
  // console.log(title)
 
  // window.location.reload();
}

//edit subtask
const editSubTask = (subId, updatedSubTask) => {
  fetch(`http://localhost:8081/subtask/${subId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedSubTask),
  })
    .then((res) => res.json())
    .then((result) => {
      // Handle the result if needed
      console.log(result);
      // Update the tasks list with the edited task
      const updatedSubTasks = subtasks.map((subtask) => {
        if (subtask.id === subId) {
          return result;
        }
        return subtask;
      });
      setSubTasks(updatedSubTasks);
    })
    .catch((error) => {
      // Handle errors if any
      console.error("Error editing task:", error);
    });
};

const handleEditSubTask = (e) => {
  e.preventDefault();
  const updatedSubTask = {
    taskId: taskId,
    title:esTitle,
    completed:false
  };

  // console.log(updatedSubTask)
  editSubTask(esId, updatedSubTask);
  setEditSubVisible(false);
  window.location.reload();
};

      
      //to return task component
      const taskComp = (index,title, id, priority, image,datetime, isCompleted) =>{

        

        let taskBgColor
        if(priority==="Critical"){
          taskBgColor=critPriorityColor
        }
        if(priority==="High"){
          taskBgColor=highPriorityColor
        }
        if(priority==="Medium"){
          taskBgColor=mediumPriorityColor
        }
        if(priority==="Low"){
          taskBgColor=lowPriorityColor
        }

        

        return(
          <Task key={index} style={{ backgroundColor: taskBgColor }}>
          <span className="tasktitle">
            <input type="checkbox" className="radio-checkbox" checked={isCompleted} onClick={()=>editTaskCompleted(id,priority,title,image,datetime,isCompleted)}/>
            <p onClick={()=>setImg(image)} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{title}</p>
          </span>

          {subtasks.length > 0 && (
            <span className="subtasklist">
              {/* Display matching subtasks */}
              {subtasks.map((subtask, subtaskIndex) => {
                if (subtask.taskId === id) {
                  return (
                    <span className="subtask" key={subtaskIndex}>
                      <input
                        type="checkbox"
                        className="radio-mini-checkbox"
                        checked={subtask.completed}
                        onClick={()=>editSubTaskCompleted(id,subtask.id,subtask.title, subtask.completed)}
                      />
     <p
  onClick={() => {
    setEditSubVisible(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setTaskId(id);
    setESId(subtask.id);
    setESTaskTitle(subtask.title);
  }}
  style={{ textDecoration: subtask.completed ? 'line-through' : 'none' }}
>
  {subtask.title}
</p>
                    </span>
                  );
                }
                return null;
              })}
            </span>
          )}

          <div className="menu">
            <button onClick={()=>editMenuVisibility(id,title, priority, image)}>Update task</button>
            <button  onClick={()=>{setAddSubVisible(true);  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";setTaskId(id)}}>Add subtask</button>
            <Select options={options} placeholder={priority} onChange={(selectedOption) => updTaskPriority(id,selectedOption.value,title,image,datetime)}/>
          </div>
        </Task>
        )

        
      }

//create states
const [tasks, setTasks] = useState([])
const [subtasks, setSubTasks] = useState([])

useEffect(()=>{
    fetch("http://localhost:8080/task/getAll")
    .then(res=>res.json())
    .then((result)=>{
      setTasks(result);
    }
  )
  },[])

  useEffect(()=>{
    fetch("http://localhost:8081/subtask/getAll")
    .then(res=>res.json())
    .then((result)=>{
      setSubTasks(result);
    }
  )
  },[])


    return(
        <StyledHome>
         <Nav>
<div className="logoDiv">
<img src={logo} alt="App logo" />
<span>SwifTasks</span>
</div>

<div className="flex">
<div className="Btn" onClick={()=>{setAddTaskVisible(true);  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";}}>
    <span >Add task</span>
</div>

<a href="/" className="Btn">Log out</a>
</div>

         </Nav>
  <Body>
  <Image style={{ backgroundImage: `url(${img})`}}/>
  <Tasks>
  <h2>Today</h2>
  <div className="tasklist">
    {tasks.length > 0 && (
      <>
        {tasks.map((task, index) => {
          if (task.userId === userId) {
            const taskDueDate = new Date(task.expectedDateTime);
            const today = new Date();
            
            if (taskDueDate.toDateString() === today.toDateString()) {
              
              return taskComp(index, task.title, task.id, task.priority, task.imageUrl, task.expectedDateTime, task.completed);
            }
          }
          return null;
        })}
      </>
    )}
  </div>
</Tasks>
<Tasks>
  <h2>This week</h2>
  <div className="tasklist">
    {tasks.length > 0 && (
      <>
        {tasks.map((task, index) => {
          if (task.userId === userId) {
            const taskDueDate = new Date(task.expectedDateTime);
            const today = new Date();
            const oneWeekLater = new Date();
            oneWeekLater.setDate(oneWeekLater.getDate() + 7);
            const isDueToday = taskDueDate.toDateString() === today.toDateString();
            
            if (!isDueToday && taskDueDate > today && taskDueDate <= oneWeekLater) {
              return taskComp(index, task.title, task.id, task.priority, task.imageUrl, task.expectedDateTime, task.completed);
            }
          }
          return null;
        })}
      </>
    )}
  </div>
</Tasks>

<Tasks>
  <h2>This month</h2>
  <div className="tasklist">
    {tasks.length > 0 && (
      <>
        {tasks.map((task, index) => {
          if (task.userId === userId) {
            const taskDueDate = new Date(task.expectedDateTime);
            const today = new Date();
            const oneWeekLater = new Date();
            oneWeekLater.setDate(oneWeekLater.getDate() + 7);
            const oneMonthLater = new Date();
            oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
            
            if (taskDueDate > oneWeekLater && taskDueDate <= oneMonthLater) {
              return taskComp(index, task.title, task.id, task.priority, task.imageUrl, task.expectedDateTime, task.completed);
            }
          }
          return null;
        })}
      </>
    )}
  </div>
</Tasks>
<Tasks>
  <h2>This year</h2>
  <div className="tasklist">
    {tasks.length > 0 && (
      <>
        {tasks.map((task, index) => {
          if (task.userId === userId) {
            const taskDueDate = new Date(task.expectedDateTime);
            const today = new Date();
            const oneMonthLater = new Date();
            oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
            const oneYearLater = new Date();
            oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
            
            if (taskDueDate > oneMonthLater && taskDueDate <= oneYearLater) {
              return taskComp(index, task.title, task.id, task.priority, task.imageUrl, task.expectedDateTime, task.completed);
            }
          }
          return null;
        })}
      </>
    )}
  </div>
</Tasks>
<Tasks>
  <h2>Later</h2>
  <div className="tasklist">
    {tasks.length > 0 && (
      <>
        {tasks.map((task, index) => {
          if (task.userId === userId) {
            const taskDueDate = new Date(task.expectedDateTime);
            const today = new Date();
            const oneYearLater = new Date();
            oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
            
            if (taskDueDate > oneYearLater) {
              return taskComp(index, task.title, task.id, task.priority, task.imageUrl, task.expectedDateTime, task.completed);
            }
          }
          return null;
        })}
      </>
    )}
  </div>
</Tasks>
<Tasks>
  <h2>Past due date</h2>
  <div className="tasklist">
    {tasks.length > 0 && (
      <>
        {tasks.map((task, index) => {
          if (task.userId === userId) {
            const taskDueDate = new Date(task.expectedDateTime);
            const today = new Date();

            if (taskDueDate < today) {
              return taskComp(index, task.title, task.id, task.priority, task.imageUrl, task.expectedDateTime, task.completed);
            }
          }
          return null;
        })}
      </>
    )}
  </div>
</Tasks>


         
  </Body>

  {addTaskVisible && 
  <AddMenu>
  <div className="main">
      <h2>Add a task.
  Set it’s priority.
  Give us an image url to remember it better.</h2>
  <form onSubmit={handleAddTask}>
      
                  <div className="input">
                      <label htmlFor="">Task name</label>
                  <input type="text" value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)}/>
                  </div>
                  <div className="input">
                      <label htmlFor="">Expected date</label>
                      <input type="datetime-local" value={taskDateTime} onChange={(e)=>setTaskDateTime(e.target.value)}/>
                  </div>
                  <div className="input">
                      <label htmlFor="">Set priority</label>
                      <Select options={options} value={selectedPriority} placeholder={selectedPriority} onChange={(selectedOption) => setSelectedPriority(selectedOption.value)}/>
                  </div>
                  <div className="input">
                      <label htmlFor="">Image URL</label>
                      <input type="text" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}/>
                  </div>
             
              <button>Add task</button>
  <a onClick={()=>{setAddTaskVisible(false);  document.body.style.overflow = "auto";}}>Go back</a>
              </form>
  </div>
    </AddMenu>}

    {
      editMenuVisible &&

      <EditMenu>
      <div className="main">
          <h2>Sometimes plans change. And so can your tasks. Edit the details below.</h2>
      <form action="">
          
                      <div className="input">
                          <label htmlFor="">Task name</label>
                      <input type="text" placeholder="Task name" value={etaskTitle} onChange={(e)=>eSetTaskTitle(e.target.value)}/>
                      </div>
                      <div className="input">
                          <label htmlFor="">Expected date</label>
                          <input type="datetime-local" value={etaskDateTime} onChange={(e)=>eSetTaskDateTime(e.target.value)}/>
                      </div>
                      <div className="input">
                          <label htmlFor="">Set priority</label>
                          <Select options={options} placeholder={eselectedPriority} onChange={(selectedOption) => eSetSelectedPriority(selectedOption.value)}/>
                      </div>
                      <div className="input">
                          <label htmlFor="">Image URL</label>
                          <input type="text"  placeholder="Task image" value={eimageUrl} onChange={(e)=>eSetImageUrl(e.target.value)}/>
                      </div>
                 
                      <button onClick={(e) => handleEditTask(e, taskId)}>Edit task</button>

      <a onClick={revEditMenuVisibility}>Go back</a>
                  </form>
      </div>
        </EditMenu>
    }
 
  {
    addSubVisible &&
    <AddSubTaskMenu>
<div className="main">
    <h2>Sometimes a task is more than one step.
That is why we have subtasks.
Add a subtask below.</h2>
<form action="">
    
                <div className="input">
                    <label htmlFor="">Subtask</label>
                <input type="text" value={subTaskTitle} onChange={(e)=>setSubTaskTitle(e.target.value)}/>
                </div>
           
            <button onClick={(e)=>handleAddSubTask(e,taskId, subTaskTitle)}>Add subtask</button>
            <a onClick={()=>{setAddSubVisible(false);  document.body.style.overflow = "auto";}}>Go back</a>
            </form>
</div>
  </AddSubTaskMenu>
  }

  {
    editSubVisible &&
    <EditSubTaskMenu>
<div className="main">
    <h2>Made a mistake? No problem. Change the subtask below.</h2>
<form action="">
    
                <div className="input">
                    <label htmlFor="">Subtask</label>
                <input type="text" value={esTitle} onChange={(e)=>setESTaskTitle(e.target.value)}/>
                </div>
           
            <button onClick={(e)=>handleEditSubTask(e)}>Edit subtask</button>
            <a onClick={()=>{setEditSubVisible(false);  document.body.style.overflow = "auto";}}>Go back</a>
            </form>
</div>
  </EditSubTaskMenu>
  }
  
        </StyledHome>
    )
}

const StyledHome = styled(motion.div)`
    width: 100%;
    height: auto;
`
const Nav = styled(motion.div)`
    width: 100%;
    height: 90px;
    display: flex;
    padding: 0 90px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 36px;
    position: fixed;
    background: ${buttonColor};
    top: 0;
    left: 0;
    z-index: 3;

    .logoDiv{
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;

        img{
            height: 100%;
        }

        span{
            font-size: 32px;
        }
    }

    .flex{
      display: flex;
      gap: 30px;

      a{
        text-decoration: none;
      }
      .Btn{
        width: 230px;
        height: 40px;
        display: flex;
        background-color: ${mainColor};
        color: ${buttonColor};
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all.3s ease;

        &:hover{
background-color: ${hoverColor};
        }
    }
    }

   
`

const Body = styled(motion.div)`
    width: 100%;
    position: relative;
    margin-top: 100px;
    padding: 0 90px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
`

const Image = styled(motion.div)`
background-position: center;
background-size: cover;
    width: 30%;
    height: 80vh;
    position: fixed;
    left: 0;
    top: 0;
    margin-left: 90px;
    margin-top: 100px;
    z-index: 3;
`

const Tasks  = styled(motion.div)`
margin-bottom: 50px;
    width: 50%;
    float: right;
    display: flex;
    flex-direction: column;
    gap:20px ;
   
   h2{
    font-weight: 400;
   }

   .tasklist{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-bottom: 50px;

   }
`

const Task  = styled(motion.div)`
     display: flex;
    flex-direction: column;
        width: 100%;
        padding: 24px 36px;
        gap: 20px;

        .tasktitle{
            display: flex;
            align-items: center;
            gap: 32px;

          .radio-checkbox {
  width: 20px;
  height: 20px;
  appearance: none;
  -webkit-appearance: none;
  border: 2px solid ${buttonColor};
  border-radius: 100px;
  outline: none;
  background-color: transparent;

  &:checked {
  background-color: ${buttonColor};
}

&::after {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 100px;
  background-color: white;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
}

&:checked::after {
  visibility: visible;
}
}

p{
  cursor: pointer;
    font-size: 24px;
    color: ${buttonColor};
}

        }

        .subtasklist{
            display: flex;
            flex-direction: column;
    gap: 12px;

    .subtask{
        display: flex;
        align-items: center;
        gap: 16px;
        margin-left: 50px;

        p{
    font-size: 16px;
    color: ${buttonColor};
}

.radio-mini-checkbox {
    width: 10px;
  height: 10px;
  border: 2px solid ${buttonColor};
  border-radius: 100px;
  outline: none;
  background-color: transparent;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  &:checked {
  background-color: ${buttonColor};
}

&::after {
    content: "";
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 100px;
  background-color: white;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
}

&:checked::after {
  visibility: visible;
}
}



        
    }
        }

        .menu{
            margin-left: auto;
            height: 40px;
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            button{
                width: 140px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: ${buttonColor};
                color: ${mainColor};
                transition: all.3s ease;

                &:hover{
                   background-color: ${hoverColor};
                   color: ${buttonColor};
                }
            }

            Select{
                width: 140px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${mainColor};
                cursor: pointer;
            }
        }

`

const AddMenu  = styled(motion.div)`
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    background-color: rgba(74, 84, 85, 0.68);
    display: flex;
    justify-content: flex-end;

    

    .main{
        width: 50%;
        
        background: ${buttonColor};
        display: flex;
        gap: 28px;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h2{
        width: 70%;
    }

        form{
        width: 70%;
        display: flex;
    flex-direction: column;
    gap: 20px;

    a{
        font-size: 20px;
        cursor: pointer;
    }

    .input{
        width: 100%;
        display: flex;
    flex-direction: column;
    gap: 22px;
        label{
            font-size: 20px;
        }
        input, Select{
            height: 45px;
            font-size: 20px;
        }
    }
    
   
    }
    }
`

const EditMenu  = styled(motion.div)`
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    background-color: rgba(74, 84, 85, 0.68);
    display: flex;
    justify-content: flex-end;

    

    .main{
        width: 50%;
        
        background: ${buttonColor};
        display: flex;
        gap: 28px;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h2{
        width: 70%;
    }

        form{
        width: 70%;
        display: flex;
    flex-direction: column;
    gap: 20px;

    a{
        font-size: 20px;
        cursor: pointer;
    }

    .input{
        width: 100%;
        display: flex;
    flex-direction: column;
    gap: 22px;
        label{
            font-size: 20px;
        }
        input, Select{
            height: 45px;
            font-size: 20px;
        }
    }
    
   
    }
    }
`

const AddSubTaskMenu  = styled(motion.div)`
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    background-color: rgba(74, 84, 85, 0.68);
    display: flex;
    justify-content: flex-end;

    

    .main{
        width: 50%;
        
        background: ${buttonColor};
        display: flex;
        gap: 28px;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h2{
        width: 70%;
    }

        form{
        width: 70%;
        display: flex;
    flex-direction: column;
    gap: 20px;

    a{
        font-size: 20px;
    }

    .input{
        width: 100%;
        display: flex;
    flex-direction: column;
    gap: 22px;
        label{
            font-size: 20px;
        }
        input, Select{
            height: 45px;
            font-size: 20px;
        }
    }
    
   
    }
    }
`

const EditSubTaskMenu  = styled(motion.div)`
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    background-color: rgba(74, 84, 85, 0.68);
    display: flex;
    justify-content: flex-end;

    

    .main{
        width: 50%;
        
        background: ${buttonColor};
        display: flex;
        gap: 28px;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h2{
        width: 70%;
    }

        form{
        width: 70%;
        display: flex;
    flex-direction: column;
    gap: 20px;

    a{
        font-size: 20px;
    }

    .input{
        width: 100%;
        display: flex;
    flex-direction: column;
    gap: 22px;
        label{
            font-size: 20px;
        }
        input, Select{
            height: 45px;
            font-size: 20px;
        }
    }
    
   
    }
    }
`
export default Home;

   