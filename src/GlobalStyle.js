import { createGlobalStyle } from "styled-components";

const mainColor = "#92B6D5";
const bgColor = "#F9F9F9"
const btnHoverColor = "#678096"

const GlobalStyles = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}

body{
    width: 100%;
    overflow-x: hidden;
   color: ${mainColor};
   background-color: ${bgColor};
   font-family: 'Varela Round', sans-serif;
}

input, select, Select{
  background: none;
            border: 2px solid ${mainColor};
            padding: 10px;
    &:focus{
      outline:none;
    }

  }

  a{
    color: ${mainColor};
    text-decoration: underline;
  }

  button{
        height: 45px;
        background-color: ${mainColor};
        border: none;
        font-size: 20px;
        color: ${bgColor};
        transition: .3s ease-in;
        cursor: pointer;
        font-family: 'Varela Round', sans-serif;
        &:hover{
          background-color: ${btnHoverColor};
        }
    }
`

export default GlobalStyles;