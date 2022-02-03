import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoandig] = useState(true);

    useEffect(()=>{
        //recuperamos a info do local storaage
        const recoveredUser = localStorage.getItem('user');
        const responseToken = localStorage.getItem('token');

        //verificamos se ela de fato existe
        if(recoveredUser && responseToken ){
            //parseamos para josn novamente 
            //e setamos no estado user
            setUser(JSON.parse(recoveredUser))
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(responseToken)}`
        }
        setLoandig(false)
    },[])

    const login = async (email, password) => {
        const response = await createSession(email, password)

        console.log("Login", response.data)
  
        const loggedUser =  response.data.user;
        const responseToken = response.data.token ;

        //local string guarda apenas strings
        //precisamos converter para string para que ele possa salvar 
        localStorage.setItem("user", JSON.stringify(loggedUser))
        localStorage.setItem("token", JSON.stringify(responseToken))

        api.defaults.headers.Authorization = `Bearer ${responseToken}`

            setUser(loggedUser)
            navigate("/")
    }

    const logout = (email, password) => {
        console.log("Logout", email, password)
        api.defaults.headers.Authorization = null
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null)
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}