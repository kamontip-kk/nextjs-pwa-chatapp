import React, { useState, useEffect } from "react";
import { Button } from 'antd';
import { useRouter } from "next/router";

function Login() {
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem(`username`)){
            router.push(`/`);
        } else {
            null;
        }
    }, [])

    const onLogin = () =>{
        localStorage.setItem(`username`,username);
    } 

    return (
        <div className={`login`}>
            <div className={`loginmodal`}>
                <h2>Login</h2>
                <form onSubmit={onLogin}>
                    <input onChange={(e)=> setUsername(e.target.value)} placeholder="username" type="username" name="username" required />
                    <div className={`submitbtn`}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </div>
                </form>            
            </div>
        </div>
    )
}

export default Login