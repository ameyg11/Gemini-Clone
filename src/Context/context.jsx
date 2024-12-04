// ContextProvider.js
import React, { createContext, useEffect, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showresult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextword) => {
        setTimeout(() => {
          setResultData((prev) => prev + nextword);
        }, 75 * index);
      };
      
      
    let sentId = 0;

    const onSent = async (prompt) => {

        const currentId = ++sentId;
        console.log(`[onSent] Called with id: ${currentId} and prompt: ${prompt}`);
        console.log("Type of prompt:", typeof prompt); // Logs the type of prompt
        console.log("Prompt value:", prompt); // Logs the value of prompt
        
            setResultData("")
            setLoading(true)
            setShowResult(true)
            setRecentPrompt(prompt)
            const response = await run(prompt);
            console.log("type of result data",typeof resultData)
            let responseArray = response.split("**");
            console.log(responseArray);
            let newResponse = "";
            for(let i=0; i < responseArray.length; i++){
                if(i === 0 || i % 2 !== 1){
                    newResponse += responseArray[i];
                }
                else{
                    newResponse +=  "<b>" + responseArray[i] + "</b>";
                }
            }
            let newResponseWithLineBreak =  newResponse.split("##").join("</br>");
            let newResponse2 = newResponseWithLineBreak.split("*").join("</br>");
            setResultData(newResponse2)
            let newResponseArray = newResponse2.split(" ");
            for (let i=0; i< newResponseArray.length; i++){
                const nextword = newResponseArray[i];
                delayPara(i, nextword + " ")
            }
            setLoading(false)
            setInput(" ")
    };


    
    const contextValue = {
        // Define any context values or functions here
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showresult,
        loading,
        resultData,
        input,
        setInput
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
