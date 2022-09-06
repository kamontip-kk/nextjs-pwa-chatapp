import React, { useEffect, useState } from "react";
import { Modal, Button, Space } from 'antd';
import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "../pages/api/db";
import { CreateChatRoomProps } from "../pages/api/chatroom.model";

function Header() {
    const [modalOpen, setModalOpen] = useState(false);
    const [chatname, setChatname] = useState('');
    const [title, setTitle] = useState<string | string[]>();
    const [post, setPost] = useState<any[]>([]);
    const router = useRouter();
    const {query} = useRouter();

    const createChatRoomProps: CreateChatRoomProps = {
        title:chatname,
    };
    
    const onLogout = () =>{
        localStorage.removeItem(`username`);
    }

    const createRoom = async () =>{
        try{
            const create = await db.chatlists.add(createChatRoomProps);
            setChatname('');
        } catch (error){
            alert(`Failed to create chat room: ${error}`);
        }
    }

    useEffect(()=>{
        const chatname = localStorage.getItem('chatname');
        if(chatname){
            setTitle(chatname);
        } 
    })

    // const onback = () =>{
    //     localStorage.removeItem(`chatid`);
    // }

    return (
        <>
            {router.pathname == '/login' ?
                null :
                <header className={`header`}>
                    {router.pathname == '/chatroom' ?
                        (
                            <Space>
                                <Link href="/">
                                    <a className={`material-symbols-outlined arrowback`}>arrow_back</a>
                                </Link>
                                <span>{title}</span>
                            </Space>
                        ) :
                        <>
                            <div>
                                <span>Chat List</span>
                            </div>
                            {post.map(data=>{
                                    <span key={data.id}>{data.title}</span>
                                })}
                            <div>
                                <Link href={`/login`}>
                                    <a onClick={onLogout} className={`material-symbols-outlined navitem`}>logout</a>
                                </Link>
                                <Link href={``}>
                                    <a onClick={() => setModalOpen(true)} className={`material-symbols-outlined navitem`}>add</a>
                                </Link>

                            </div>

                            <Modal
                                centered
                                open={modalOpen}
                                closable={false}
                                footer={null}
                                width={`fit-content`}
                                bodyStyle={{
                                    padding: 0,
                                }}
                            >
                                <div className={`loginmodal`}>
                                    <h2>Create new chat room</h2>
                                    <form onSubmit={createRoom}>
                                        <input onChange={(e) => setChatname(e.target.value)} placeholder="chat name" type="text" name="title" required />
                                        <div className={`submitbtn`}>
                                            <Space>
                                                <Button onClick={() => setModalOpen(false)} type="default" htmlType="submit">
                                                    Cancel
                                                </Button>

                                                <Button type="primary" htmlType="submit">
                                                    Confirm
                                                </Button>
                                            </Space>
                                        </div>
                                    </form>

                                </div>
                            </Modal>
                        </>
                    } </header>

            }
        </>
    )
}

export default Header
