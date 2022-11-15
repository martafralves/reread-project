import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function Profile() {
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    }, [user, navigate])

  return (
    <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <h1 className="display-4 profile-user"><strong>{user.username}</strong> Profile</h1>
                <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </div>
    </div>
  )
}

export default Profile
