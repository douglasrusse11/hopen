import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';


const Menu = ({user}) => {

    const {t, i18n} = useTranslation();

    return (
        <div style={menuStyle}>
            <Link style={{textDecoration: "none", color: '#F5F5F5'}} to="/resources/bycategory/Accomodation">
                <h3>{t('home.resources')}</h3>
            </Link>
            <Link style={{textDecoration: "none", color: "whitesmoke"}} to="/contact">
                <h3>{t('home.contact')}</h3>
            </Link>
            <Link style={{textDecoration: "none", color: "whitesmoke"}} to="/news">
                <h3>{t('home.news')}</h3>
            </Link>
            { user && user.isAdmin && 
                <Link style={{textDecoration: "none", color: "whitesmoke"}} to="/seeder">
                    <h3>{t('home.db')}</h3>
                </Link>
            }
        </div>
    )

}

const menuStyle = {
    height: "88vh",
    width: "200px",
    backgroundColor: "#0F1626",
    paddingRight: '1vh',
    paddingLeft: '1vh',
    position: "fixed",
    zIndex: "1001"
}

export default Menu;