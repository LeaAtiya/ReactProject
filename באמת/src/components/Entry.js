import { Button } from 'semantic-ui-react'
import { Link,useNavigate } from 'react-router-dom'
import React from 'react';

export default function Entry() {
    const navigate = useNavigate();

    return   <div className=' d' >
            <h1>ברוך הבא!</h1>
            <Link to="login">
                <Button >התחברות </Button>
            </Link>
            <Link to="/signup">
                <Button >הרשמה </Button>
            </Link>

        </div >
    
}