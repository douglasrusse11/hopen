import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Auth, Hub} from 'aws-amplify';
import Header from '../components/Header';
import Nav from '../components/Nav';

const Router = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser()
        Hub.listen('auth', (data) => {
            const { payload: { event }} = data
            if (event === 'signIn' || event === 'signOut') getUser()
        })
    }, [])

    const getUser = async () => {
        try {
            const data = await Auth.currentAuthenticatedUser();
            const userInfo = {username: data.username, isAdmin: data.signInUserSession.idToken.payload['cognito:groups'] && data.signInUserSession.idToken.payload['cognito:groups'].includes('Admin'), ...data.attributes};
            setUser(userInfo);
        } catch (err) {
            setUser(null);
            console.log('error: ', err);
        }
    }

    return (
        <BrowserRouter >
            <Header user={user} />
            <Nav />
        </BrowserRouter>
    )
}

export default Router;