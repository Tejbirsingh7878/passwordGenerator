import { useState,useCallback, useEffect,useRef } from "react";

function PassGen(){

    // get variable name needed for projects 
    const[length,setlength]=useState(10);
    const[numbers,setnumbers]=useState(false);
    const[password,setpassword]=useState("");
    const[characters,setcharacters]=useState(false);

    // useCallback hook 

    const GeneratePassword= useCallback(()=>{ // use to memoized or store value in cache and optimize
        let pass=""; // to be generated 
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(numbers) str+="0123456789";
        if(characters) str+="@!{}[]&";
       
        for(let i=1; i<=length;i++){
        let char = Math.floor(Math.random() * str.length+1);// random value 
        pass+=str.charAt(char);
          
        }
        setpassword(pass)// add pass value to setpassword state 

    },[length,numbers, characters,setpassword]) // relations [is the dependency array ] 

     // copyToClip 

     const copyToClip=useCallback(()=>{
        passref.current?.select();
        window.navigator.clipboard.writeText(password)
     },[password])



    // useEffect hook 

    useEffect(()=>{// any in change in dependency array and when first render,  re-render the states
       GeneratePassword();
    },[length,numbers,characters,GeneratePassword])


    // useRef hook 

    const passref=useRef(null);

    return(
    <>
    <h1 className="text-3xl text-center font-i">Generate Passwords</h1>

    <div className="max-w-md rounded-lg overflow-hidden shadow-lg  my-8 px-6 py-4 mx-auto">
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
         <input 
         className="outline-none w-full py-1 px-3"
         type="text"
         value={password}
         placeholder="Generated password"
         readOnly
         ref={passref}
         ></input>
         <button onClick={copyToClip}
         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:ring-blue-300 px-3 py-0.5 shrink-0" >
        copy</button>
        </div>
        
        <div className="flex test-sm gap-x-3 "> 
        <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={10}
            max={25}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setlength(e.target.value)}} // onchange method needs event 
            />
           <label> length:{length}</label>
    
        <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            name="bordered-checkbox"
            defaultChecked={numbers}
            id="numbersInput"
            onChange={()=>{
                setnumbers((prev)=>!prev)
            }}
            />
            <label>Numbers</label>
                        
            </div> 
            <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            name="bordered-checkbox"
            defaultChecked={characters}
            id="numbersInput"
            onChange={()=>{
                setcharacters((prev)=>!prev)
            }}
            />
            <label>characters</label>
            </div> 
          </div>
        </div>
    </div>
    </>
    )
}
export default PassGen;

