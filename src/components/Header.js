import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '@aws-amplify/ui-react/styles.css';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');
const Header = function({user, displayMenu, setDisplayMenu}) {
    let subtitle;

    const [displayLogin, setDisplayLogin] = useState(false);
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }

    return (
        <>
        <div style={styles.container}>
            <div style={styles.headings}>
                <div style={{display: "flex"}}>
                { displayMenu ? 
                <span style={{...styles.heading, transform: "rotate(90deg)"}} className="material-icons" onClick={() => setDisplayMenu(!displayMenu)}>menu</span>
                :
                <span style={styles.heading} className="material-icons" onClick={() => setDisplayMenu(!displayMenu)}>menu</span>
                }
                <Link to="/" style={{textDecoration: 'none'}}>
                    <h1 style={styles.heading}>HopeN</h1>
                </Link>
                </div>
                { user ? <h1 style={{...styles.heading, marginRight:'2vh'}} onClick={() => {Auth.signOut(); setDisplayLogin(false)}}>Sign Out</h1> : <h1 style={{...styles.heading, marginRight:'2vh'}} onClick={() => setDisplayLogin(!displayLogin)}>Sign In</h1> }
            </div>
        </div>
        <Modal
            isOpen={displayLogin}
            onAfterOpen={afterOpenModal}
            onRequestClose={() => setDisplayLogin(false)}
            style={customStyles}
            contentLabel="Example Modal"
        ><Authenticator/></Modal>
        </>
    )
}

const styles = {
    container: {
        width: '100%',
        height: '6vh',
        backgroundColor: '#0F1626',
        padding: '1vh 0vh 1vh 0vh'
    },
    headings: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: 42,
        margin: 0,
        color: '#F5F5F5',
        padding: '0px 10px 0px 10px',
        letterSpacing: '3px'
    }
}

export default Header;