import '../../styles/messenger.css'

function Message({own}) {
  return (
    <div className={own ? 'message own' : 'message'}>
        <div className='message-top'></div>
            <p className='msg-text'>Hello this is a message</p>
        <div className='message-bottom'>
            1 hour ago
        </div>
      
    </div>
  )
}

export default Message
