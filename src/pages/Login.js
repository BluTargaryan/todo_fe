import { motion } from "framer-motion";
import {  useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import emailjs from 'emailjs-com';
//images
import bgimg from '../images/registerpgimg.jpg' 

const mainColor = "#92B6D5";
const buttonColor = "#F9F9F9"

const Login = () =>{

    const navigate= useNavigate()
    //for forgotten email
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');
    //method for click
    const handleClick=(e)=>{
        e.preventDefault()
        const userFound = users.find(user => user.name === name && user.password === password);
        if (userFound) {
            const userId = userFound.id;
            navigate('/home', { state: { userId } });
          
        } else {
          alert("No account like this exists. Check your login details");
        }
        setName("");// Clearing the name input field
        setPassword(""); 
    }

    const templateParams = {
        email: userEmail, // User's email
        message: message
      };

    //method for forgotten password
    const detailSubmit = (e) => {
        e.preventDefault();
      
        const userFound = users.find(user => user.email === email);
        if(userFound){
            setUserEmail(email)
            setMessage("Your name is " + userFound.name + " and your password is " + userFound.password)
        }
      
        // if (userFound) {
        //   alert("Your name is " + userFound.name + " and your password is " + userFound.password);
        //   setDisplayForgotten(false)
        // } else {
        //   alert("This account doesn't exist");
        // }

 emailjs
    .send(
      "service_cz4atw8",
      "template_xyffitb",
      templateParams,
      "MfYl89cHFn5-ksKSd"
    )
    .then(
      (result) => {
        alert("Email sent successfully!");
        
        setDisplayForgotten(false)
        // You can perform any additional actions here, such as displaying a success message
      },
      (error) => {
        alert("Failed to send email:", error);
        // You can handle the error case here, such as displaying an error message to the user
      }
    );


        setEmail('')
      };

//create states
const [users, setUsers] = useState([])
const [displayForgotten, setDisplayForgotten] = useState(false)
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

useEffect(()=>{
    fetch("http://localhost:8082/user/getAll")
    .then(res=>res.json())
    .then((result)=>{
      setUsers(result);
    }
  )
  },[])

 

    return(
        <StyledLogin>
           <div className="img" onClick={ () => setDisplayForgotten(false)}/>

         <div className="main">
            <div className="intro">
            <h1>Welcome back. 
Please put in your details to login.</h1>
<h3>No account? <a href="/reg">Please register with us</a></h3>
            </div>
            
            <form action="">
                <div className="input">
                    <label htmlFor="">Name</label>
                <input type="text" value={name}  onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="input">
                    <label htmlFor="">Password</label>
                    <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)}/>
                </div>
        
            
           
            <button onClick={handleClick}>Login</button>

            <a href="#" onClick={() => setDisplayForgotten(true)}>Forgotten password?</a>
            </form>
         </div>



{displayForgotten &&
    <div className="altft">
<div className="main">
            <div className="intro">
            <h1>Please put in your email for detail retrieval</h1>
            </div>
            
            <form action="">
                <div className="input">
                    <label htmlFor="">E-mail</label>
                <input type="text" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                </div>  
           
            <button onClick={detailSubmit}>Retrieve details</button>
            </form>
         </div>
</div>}
         
        </StyledLogin>
    )
}

const StyledLogin = styled(motion.div)`
width: 100%;
display: flex;
align-items: center;
min-height: 100vh;
position: relative;

.img{
    background-image: url(${bgimg});
    background-position: center;
    background-size: cover;
    height: 95vh;
    width: 40%;
    margin-left: 1%;
}

.main{
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-left: 10%;
    gap: 40px;

    .intro{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 28px;

        h1{
            font-size: 24px;
        }

        h3{
            font-size: 20px;
            font-weight: 200;
        }
    }

    form{
        width: 100%;
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
        input{
            height: 45px;
            font-size: 20px;
        }
    }
    
   
    }

}

.altft{
    position: absolute;
    right: 0;
    top: 0;
    background-color: ${buttonColor};
    display: flex;
    width: 60vw;
    height: 100vh;
    justify-content: center;
    align-items: center;


    .main{
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-left: 10%;
    gap: 40px;

    .intro{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 28px;

        h1{
            font-size: 24px;
        }

        h3{
            font-size: 20px;
            font-weight: 200;
        }
    }

    form{
        width: 100%;
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
        input{
            height: 45px;
            font-size: 20px;
        }
    }
    
   
    }

}
}
`


export default Login;

   