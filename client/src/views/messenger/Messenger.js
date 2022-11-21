import Conversations from '../../components/messenger/Conversations'
import Message from '../../components/messenger/Message'
import '../../styles/messenger.css'

function Messenger() {
  return (
    <div className='messenger'>
        <div className='chatMenu'>
            <div className='chatMenuWrapper'>
                <input placeholder='Search users' className='chatMenuInput'></input>
                <Conversations/>
                <Conversations/>
                <Conversations/>
                <Conversations/>
                <Conversations/>
                <Conversations/>
            </div>

        </div>
        <div className='chatBox'>
            <div className='chatBoxWrapper'>
                <div className='chatBoxTop'>
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                    <Message/>
                </div>
                <div className='chatBoxBottom'>
                    <textarea className='chatInput' placeholder='Type your message...'></textarea>
                    <button className='chatSubmitBtn'>Send</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Messenger
