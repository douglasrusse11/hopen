import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Auth, Hub} from 'aws-amplify';
import Location from 'aws-sdk/clients/location';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import ResourceList from './ResourceList';
import ResourceContainer from './ResourceContainer';
import Menu from '../components/Menu';
import Seeder from './Seeder';
import config from '../aws-exports';
import ContactForm from './ContactForm';
import News from './NewsAPI';





const Router = () => {
    const [user, setUser] = useState(null);
    const [client, setClient] = useState(null);
    const [displayMenu, setDisplayMenu] = useState(false)

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

    useEffect(() => {
        Auth.currentCredentials()
            .then( credentials => {
                setClient(new Location({
                    credentials,
                    region: config.aws_project_region,
                }))
            })
    }, []);
        

    

    return (
        
            <BrowserRouter >
            <Header user={user} displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} />
            <div style={{display: "flex", width: "100%", height: "88vh"}}>
            {displayMenu && <Menu user={user} />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resources/bycategory/:category" element={<ResourceList user={user} client={client}/>} />
                {/* <Route path="/resources/:id" element={<ResourceContainer user={user} formData={formData} setFormData={setFormData} client={client}/>} /> */}
                <Route path="/seeder" element={<Seeder client={client}/>} />
                <Route path="/contact" element={<ContactForm/>} />
                <Route path="/news" element={<News/>} />
                
            

            </Routes>
            </div>
            <Footer />
        </BrowserRouter>

       
        
    )
}

export default Router;