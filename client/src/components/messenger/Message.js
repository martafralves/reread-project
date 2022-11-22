import {format} from 'timeago.js'
import '../../styles/messenger.css'

function Message({message, own}) {
  return (
    <div className={own ? 'message own' : 'message'}>
        <div className='message-top'></div>
            <p className='msg-text'>{message.text}</p>
        <div className='message-bottom'>
            {format(message.createdAt)}
        </div>
      
    </div>
  )
}

export default Message
