import type { NextPage } from 'next'
import ChatList from '../Components/ChatList'
import { useRouter } from "next/router";
import { useEffect } from 'react'

const Home: NextPage = () => {
  const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem(`username`)){
            null;
        } else {
            router.push(`/login`);
        }

        if(localStorage.getItem('chatid')){
          localStorage.removeItem(`chatid`);
        }  

        if(localStorage.getItem('chatname')){
          localStorage.removeItem(`chatname`);
        }

    },[])

  return (
    <main className={`container`}>
      <ChatList/>
    </main>
        
  )
}

export default Home
