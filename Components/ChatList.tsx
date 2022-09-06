import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../pages/api/db";;
import { useRouter } from "next/router";

function ChatList() {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    const router = useRouter();
    const allrooms = useLiveQuery( async () => {
        return await db.chatlists.toArray();
    });

    const onclick = (id?:number,title?:string) => {
        if(id && title){
            localStorage.setItem('chatid',id.toString());
            localStorage.setItem('chatname',title);
            router.push('/chatroom');
        } else {
            null;
        }
    }

    return (
        <div className={`chatlist`}>
            {allrooms?.map((room) => {
                return (
                    <>
                        <Link key={room.id} 
                        href={``}
                        // href={{pathname: `/chatroom`, query: {id: room.id, title: room.title},}}
                        >
                            <a 
                            onClick={()=>onclick(room.id,room.title)}
                            // onClick={()=>setOpen(true)}
                            >
                                <div className={`chatlist-item`}>{room.title}</div>
                            </a>
                        </Link>

                        {/* <ChatView 
                        id={room.id}
                        open={open}
                        passData={getdata}
                        /> */}
                    </>


                )
            })}

        </div>
    )
}

export default ChatList