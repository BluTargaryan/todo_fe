import { motion } from "framer-motion";
import React, {useState} from "react";
import {  useNavigate } from "react-router-dom";
import styled from "styled-components";
//images
import bgimg from '../images/registerpgimg.jpg' 

const mainColor = "#92B6D5";
const buttonColor = "#F9F9F9"

const Reg = () =>{

     //set navigate const
const navigate= useNavigate()
    //method for click
    const handleClick = (e) => {
        e.preventDefault();
      
        if (!name || !email || !password) {
          alert("Please fill in all the required fields");
          return;
        }

          // Email format validation using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }
      
        if (password !== passwordCheck) {
          alert("Make sure your password is the same as your second password");
          return;
        }

        if(consentCheck!==true){
            alert("Please check the consent checkbox if you agree to our terms and want to create an account");
            return;
        }
      
        const user = { email, name, password };
        console.log(user);
      
        fetch("http://localhost:8082/user/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then(() => {
            setEmail("");
            setName("");
            setPassword("");
            setPasswordCheck("");
            //navigate to login
            navigate('/')
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      

//create states
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [passwordCheck, setPasswordCheck] = useState('')
const [consentCheck, setConsentCheck]=useState(false)
    return(
        <StyledReg>
           <div className="img"/>

         <div className="main">
            <div className="intro">
            <h1>Welcome to SwifTasks. 
We are so excited to be your choice for organized ease and comfort.</h1>
<h3>Have an account? <a href="/">Please login</a></h3>
            </div>
            
            <form action="">
                <div className="input">
                    <label htmlFor="">Name</label>
                <input type="text" value={name}  onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="input">
                    <label htmlFor="">E-mail</label>
                <input type="e-mail" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="input">
                    <label htmlFor="">Password</label>
                    <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="input">
                    <label htmlFor="">Re-enter password</label>
                    <input type="password" value={passwordCheck}  onChange={(e)=>setPasswordCheck(e.target.value)} />
                </div>
            
           <span id="regflex">
            <input className="rad" type="checkbox" checked={consentCheck} onClick={()=>setConsentCheck(!consentCheck)}/>
             <p>Data Usage and Confidentiality:

By checking the box, you acknowledge and agree to the following:

Your data will only be used for detail retrieval purposes.
We will not tamper, edit, or divulge your data to anybody without your explicit consent.
Thank you for your understanding and trust in our commitment to protecting your privacy.</p>
           </span>
            <button onClick={handleClick}>Submit</button>
            </form>
         </div>
        </StyledReg>
    )
}

const StyledReg = styled(motion.div)`
width: 100%;
display: flex;
align-items: center;
min-height: 100vh;

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
    padding: 30px 0;

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
    
    #regflex{
        display: flex;
        width: 100%;
        align-items: flex-start;
        justify-content: space-between;

        .rad{
  width: 20px;
  height: 20px;
  appearance: none;
  -webkit-appearance: none;
  border: 2px solid ${mainColor};
  border-radius: 100px;
  outline: none;
  background-color: transparent;

  &:checked {
  background-color: ${mainColor};
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
            width: 90%;
        }
    }
   
    }

}
`


export default Reg;

   