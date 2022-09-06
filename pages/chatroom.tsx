import React , { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/router";
import { SendMessageProps} from "./api/message.model";
import { db } from "./api/db";

function ChatRoom(){
    
    const [mymsg, setMymsg] = useState('');
    const [myname, setMyname] = useState('');
    const router = useRouter();
    const [id, setId] = useState<string>();

    const allmessages = useLiveQuery( async () => {
        const chatid = await localStorage.getItem(`chatid`)
        if(chatid){
            return await db.messages.where('chatlistId').equals(chatid).toArray();
        } else {
            return await db.messages.toArray();
        }
    });

    const sendMessageProps: SendMessageProps = {
        chatlistId: id,
        name: myname,
        message: mymsg,
    };

    useEffect(() => {
        const myname = localStorage.getItem(`username`);
        if (myname) {
            setMyname(myname);
        } else {
            router.push(`/login`);
        }

        const messageid = localStorage.getItem(`chatid`);
        if(messageid){
            setId(messageid);
        }
     
        if (window) {
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            null;
        }     

    },)

    const sendMessage = async () => {
        try {
            db.messages.add(sendMessageProps);
            setMymsg('');    
        } catch (error) {
            alert(`Failed to send message: ${error}`);
        }
    }

    return(
        <div className={`chatbackground`}>
            <div className={`chatroom`}>
                <div className={`historymessage`}>
                    {allmessages?.map((message) => {
                        
                        if (message.name == myname) {
                            return (
                                <div key={message.id} className={`sender`}>
                                    <h3>{message.name}</h3>
                                    <div className={`message`}>{message.message}</div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={message.id} className={`received`}>
                                    <h3>{message.name}</h3>
                                    <div className={`message`}>{message.message}</div>
                                </div>
                            )
                        }
                    })}
                </div>

                <form className={`typing`} onSubmit={sendMessage}>
                    <input onChange={(e) => setMymsg(e.target.value)} type="text" name="message" required />
                    <button type="submit" className={`material-symbols-outlined sendtext-icon`}>send</button>
                </form>
            </div>
        </div>
    )
}

export default ChatRoom