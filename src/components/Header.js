import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


import MenuIcon from '@mui/icons-material/Menu'
import { useTranslation, Trans } from 'react-i18next';
import ReactFlagsSelect from 'react-flags-select';
import { Gb, Ar } from 'react-flags-select';
import '@aws-amplify/ui-react/styles.css';
import './authenticatorStyle.css';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {zIndex: 1100}
  };

const Header = function ({ user, displayMenu, setDisplayMenu, displayLogin, setDisplayLogin }) {


const lngs = {
  en: { nativeName: 'English', flag: <Gb/>},
  ar: { nativeName: 'عربى', flag:<Ar/>}
};


    const {t, i18n} = useTranslation();
    const [selected, setSelected] = useState('');

    let subtitle;



    function selectLanguage(code) {
        setSelected(code);
        i18n.changeLanguage(code);
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
                {/* <div>
                    {Object.keys(lngs).map((lng) => (
                        <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal', ...styles.langButton}} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                            {lngs[lng].nativeName} {lngs[lng].flag}
                        </button>
                    ))}
                </div> */}
                <div style={{alignSelf: "flex-end", marginLeft: "auto", marginRight:"1vh"}}>
                    <ReactFlagsSelect
                        selected={selected}
                        onSelect={selectLanguage}
                        searchable
                        countries={["GB", "SY"]}
                        selectedSize={14}
                        placeholder="Select Language"
                        customLabels = {{
                            "GB": "English", "SY" : "عربى"
                        }}
                    />
                </div>
                { user ? <h1 style={{...styles.heading, marginRight:'2vh'}} onClick={() => {Auth.signOut(); setDisplayLogin(false)}}>{t('home.signout')}</h1> : <h1 style={{...styles.heading, marginRight:'2vh'}} onClick={() => setDisplayLogin(!displayLogin)}>{t('home.signin')}</h1> }
            </div>
        </div>
        <Modal
            isOpen={displayLogin}
            onRequestClose={() => setDisplayLogin(false)}
            style={customStyles}
            ariaHideApp={false}
            contentLabel="Log In"
        ><Authenticator/></Modal>
        </>
    )
}

const styles = {
    container: {
        width: '100%',
        height: '6vh',
        backgroundColor: '#0F1626',
        padding: '0px 0px 60px 0px'
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
    },
    langButton: {
        marginTop: "1vh",
        marginLeft: "1vh",
        backgroundColor: "#F5F5F5",
        color: '#0F1626',
        borderRadius: 15,
        padding: "0.5vh", 
        border: "none"
    }

}
export default Header;