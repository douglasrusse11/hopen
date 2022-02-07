import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const Menu = ({user}) => {

    const {t, i18n} = useTranslation();

    return (
        <div style={menuStyle}>
            <Link style={{textDecoration: "none", color: '#F5F5F5'}} to="/resources/bycategory/Accomodation">
                <h3>{t('home.resources')}</h3>
            </Link>
            { user && user.isAdmin && 
                <Link style={{textDecoration: "none", color: "whitesmoke"}} to="/seeder">
                    <h3>Seed DB</h3>
                </Link>
            }
        </div>
    )

}

const menuStyle = {
    height: "100%",
    width: "100px",
    backgroundColor: "#0F1626",
    paddingRight: '1vh',
    paddingLeft: '1vh'
}

export default Menu;