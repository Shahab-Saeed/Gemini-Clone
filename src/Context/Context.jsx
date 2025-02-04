import { createContext, useState } from "react";
import run from "../Config/Gemini";


export const Context= createContext();

const ContextProvider=(props) =>{
  

    const [input, setinput] = useState("")
    const [recentprompt, setrecentprompt] = useState("")
    const [previousprompt, setpreviousprompt] = useState([])
    const [showresult, setshowresult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultdata, setResultdata] = useState("")
    const delayPara=(index,nextword)=>{
        setTimeout(() => {
            setResultdata(previousprompt=>previousprompt+nextword)
        }, 75*index);
    }

    const newChat=()=>{
        setLoading(false)
        setshowresult(false)
    }
   

    const onSent=async(prompt)=>{
        setResultdata("");
        setLoading(true);
        setshowresult(true);
        let response;
        if(prompt!==undefined){
            response=await run(prompt);
            setrecentprompt(prompt)
        }
        else{
            setpreviousprompt(previousprompt=>[...previousprompt,input])
            setrecentprompt(input);
            response= await run(input)
        }
      
        let responseAssay=response.split("**");
        let newArray=" ";

        for(let i=0;i<responseAssay.length;i++){
            if(i==0 || i%2!=1){
                newArray+=responseAssay[i]
            }
            else{
                newArray+="<b>"+ responseAssay[i]+"</b>"
            }
        }
        let newResponse=newArray.split("*").join("</br>")
        let newResponseArray=newResponse.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i];
            delayPara(i,nextWord+" ");
        }
        setLoading(false);
        setinput("")
    } 

    const contextValue={
        input,
        setinput,
        recentprompt,
        setrecentprompt,
        previousprompt,
        setpreviousprompt,
        onSent,
        showresult,
        loading,
        resultdata,
        newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider