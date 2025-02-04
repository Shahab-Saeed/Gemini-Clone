import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";
// import { useContext } from "react";

const Main = () => {
  const {onSent,recentprompt,showresult,loading,resultdata,setinput,input}=useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>Geminni</p>        <img src={assets.user_icon} alt="" />
      </div>
      <div className="maincontainer">

        {!showresult?
        <>
        <div className="greet">
          <p>
            <span>Hello, Dev.</span>
          </p>
          <p>How can i help you tooday?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggets some beautiful places to see</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Suggets some beautiful places to see</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Suggets some beautiful places to see</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Suggets some beautiful places to see</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        </>  
        : <div className="result">
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentprompt}</p>
          </div>
          <div className="resultdata">
            <img src={assets.gemini_icon} alt="" />
            {loading?
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>:
            <p dangerouslySetInnerHTML={{__html:resultdata}}></p>
            }
          </div>
        </div>
      }
        <div className="mainbottom">
          <div className="searchbox">
            <input onChange={(e)=>setinput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img onClick={()=>{onSent()}} src={assets.send_icon} alt="" />:null}
            </div>
          </div>
          <p className="bottominfo">
            Gemini may display inaccurate info, including about people, so double-check its response.Your privacy and Gemini Apps 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
