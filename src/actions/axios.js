import axios from 'axios';

export default axios.create(
    {
        baseURL:"https://react-firebase-3ac52-default-rtdb.firebaseio.com/"
    }
)