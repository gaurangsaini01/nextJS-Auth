"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";

function verifyEmail() {
    const router = useRouter();
    const [token, setToken] = useState("");

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);
      }, []);

    async function verifymail(){
        try {
            await axios.post("/api/users/verifyemail",token)
            console.log('Verified')
            router.push("/login")
        } catch (error) {
            
        }
    }
  return (
    <div className='min-h-screen bg-blue-50'>
        <button onClick={verifymail}>Verify</button>
    </div>
  )
}

export default verifyEmail