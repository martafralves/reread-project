import Conversations from '../../components/messenger/Conversations'
import Message from '../../components/messenger/Message'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
//import { useLocation } from "react-router-dom"
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import {io} from 'socket.io-client'
import '../../styles/messenger.css'

function Messenger(props) {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    //const [listUsers, setListUsers] = useState([]);
    //const [newConv, setNewConv] = useState('')
    const socket = useRef();
    const scrollRef = useRef();

    const {user} = useSelector((state) => state.auth)
    

    //const location = useLocation();

    useEffect(() => {
        socket.current = io('ws://localhost:8900');
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && 
            currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev)=>[...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    /*useEffect(() => {
        const getListUsers = async() => {
            try{
                const response = await axios.get('api/users/')
                setListUsers(response.data)
            }catch(err){
                console.warn(err)
                toast.error(err)
            }
        }
        getListUsers()
    }, [])*/

    useEffect(() => {
        const getConversations = async() => {
            try{
            const response = await axios.get('api/conversation/'+user.id)
            setConversations(response.data)
            } catch(err){
                toast.error(err)
            }
        }
        getConversations()
    }, [user])


    useEffect(() => {
        const getMessages = async () => {
            try{
            const response = await axios.get('/api/message/' + currentChat?._id);
            setMessages(response.data)
            } catch(err){
                console.log(err)
            }
        }
        getMessages();
    }, [currentChat])

    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])


    async function handleSubmit(e){
        e.preventDefault();
        const message = {
            sender: user.id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find(member=> member !== user.id)
        socket.current.emit('sendMessage', {
            senderId: user.id,
            receiverId,
            text: newMessage
        })

        try{
            const response = await axios.post('/api/message', message)
            setMessages([...messages, response.data])
            setNewMessage('')
        }catch(err){
            console.log(err)
        }
    }

    /*async function handleNew(e){
        e.preventDefault()
        const newConv = {
            members: {senderId: user.id, receiverId: location.state.book}
        }

        try{    
            const response = await axios.post('/api/conversation', newConv)
            setNewConv(response.data)
        }catch(err){
            console.warn(err)
        }
    }*/
    
    
  return (
    <div className='messenger'>
        <div className='chatMenu'>
            <div className='chatMenuWrapper'>
                <input placeholder='Search users' className='chatMenuInput'/>
                {conversations.map((c) => (
                    <div onClick={() => setCurrentChat(c)} >
                        <Conversations conversation={c} currentUser={user}/>
                    </div>
                ))}
            </div>

        </div>
        <div className='chatBox'>
            <div className='chatBoxWrapper'>
                {
                    currentChat ?
                <>
                <div className='chatBoxTop'>
                    {messages.map((m)=> (
                        <div ref={scrollRef}>
                        <Message message={m} own={m.sender === user.id}/>
                        </div>
                    ))}
                </div>
                <div className='chatBoxBottom'>
                    <textarea className='chatInput' placeholder='Type your message...' 
                    onChange={(e) => setNewMessage(e.target.value)}
                    value = {newMessage}
                    ></textarea>
                    <button onClick={handleSubmit} className='chatSubmitBtn'>Send</button>
                </div>
                </> : <span className='noConversation'>Open a Conversation to start a chat.</span>}
            </div>
        </div>
    </div>
  )
}

export default Messenger
