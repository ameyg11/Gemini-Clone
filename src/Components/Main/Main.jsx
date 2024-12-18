import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/context";

const Main = () => {

    const {prevPrompts,setPrevPrompts,onSent,recentPrompt,setRecentPrompt,showresult,loading,resultData,input,setInput} = useContext(Context)

    const handleCardClick = (text) =>{
      console.log("text entered", text);
      setInput(text); 
      onSent(text);
    }

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

        {!showresult
        ?<>
        <div className="greet">
          <p>
            <span>Hello, Dev.</span>
          </p>
          <p>How can I help you today</p>
        </div>
        <div className="cards">
          <div className="card" onClick={()=>handleCardClick( "Can you make a daily productive routine for a college student.")}>
            <p>
            Can you make a daily productive routine for a college student.
            </p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card" onClick={()=>handleCardClick( "Generate innovative project ideas for a computer science major.")}>
            <p>
            Generate innovative project ideas for a computer science major.
            </p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card" onClick={()=>handleCardClick( "Suggest some books or podcasts to enhance creativity.")}>
            <p>
            Suggest some books or podcasts to enhance creativity
            </p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card" onClick={()=>handleCardClick( "What are the key steps to build a machine learning model in Python?")}>
            <p>
            What are the key steps to build a machine learning model in Python?
            </p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        </>
        :<div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading 
              ?<div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
              :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
            </div>
        </div>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) =>setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={() => onSent(input)} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
