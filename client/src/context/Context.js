import { createContext, useEffect, useReducer, } from "react"
import Reducer from "./Reducer";

const INITIAL_STATE={
    user: JSON.parse(localStorage.getItem("user")) || null,
    //we gonna take this user and if there is no user it's gonna be null
    isFetching:false,
    error:false,
};

export const Context=createContext(INITIAL_STATE);

export const ContextProvider=({children})=>{
    const [state, dispatch]=useReducer(Reducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user));
    },[state.user]);
    //this useEffect will run every time when state of the user changes


    return(
        <Context.Provider
            value={{
                user:state.user,   
                isFetching:state.isFetching,
                error:state.error,
                dispatch,
            }}
        >
            {children}
        </Context.Provider>
    );
};