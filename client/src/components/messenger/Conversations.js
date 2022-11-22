import { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/messenger.css'

function Conversations({conversation, currentUser}) {
  const [user, setUser] = useState([])
  
  useEffect(() => {
    const secondId = conversation.members.find((m)=>m !== currentUser.id)
 
    const getUser = async () => {
      try{
      const response = await axios.get('/api/users/' + secondId)
      setUser(response.data)
    }catch(err){
        console.log(err)
      }
    }
    getUser();
  }, [currentUser, conversation])

  return (
    <div className='conversation'>
      <img className='conversation-img' src='https://img.icons8.com/cotton/64/null/gender-neutral-user--v3.png' alt='Icon open source by https://icons8.com/icon/114007/customer'/>
      <span className='converdation-name'>{user?.username}</span>
    </div>
  )
}

export default Conversations
