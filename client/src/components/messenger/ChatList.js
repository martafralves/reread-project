import axios from "axios";
import { useEffect, useState } from "react";
import '../../styles/messenger.css'

function ChatList({ listUser, currentUser, setCurrentChat}) {

    const [selectUsers, setSelectUsers] = useState([]);



  return (
    <div className = 'listChat'>
        <div className='chatListMembers' >
            <div className='chatListImgContainer'>
                <img
                    className='chatListImg'
                    src='https://img.icons8.com/cotton/64/null/gender-neutral-user--v3.png' alt='Icon open source by https://icons8.com/icon/114007/customer'
                />
            </div>
            <span className='chatListName'>Username</span>
        </div>
    </div>
  )
}

export default ChatList
