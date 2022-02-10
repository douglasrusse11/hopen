import { Link } from 'react-router-dom';
import { ResourceType } from '../models';
import { useTranslation, Trans } from 'react-i18next';


const Nav = () => {

    const {t, i18n} = useTranslation();

    const categoryMap = {
        Accomodation: <><span className="material-icons">house</span>  {t('nav.accommodation')}  </>,
        Food: <><span className="material-icons">local_dining</span>  {t('nav.food')}  </>,
        Clothing: <><span className="material-icons">checkroom</span>   {t('nav.clothing')}  </>,
        Health: <><span className="material-icons">medical_services</span>  {t('nav.health')}  </>,
        Sport: <><span className="material-icons">sports_soccer</span>  {t('nav.sports')}  </>,
        Legal: <><span className="material-icons">gavel</span>  {t('nav.legal')}  </>,
        Education: <><span className="material-icons">school</span>  {t('nav.education')}  </>
    }

    return (
        <div style={navStyle}>
        { (
            Object.values(ResourceType).map((category, index) => (
                <Link style={linkStyle} key={`category_${index}`} to={`/resources/bycategory/${category}`}>
                <h3 style={headerStyle}>{categoryMap[category]}</h3>
                </Link>
        )))}
        </div>
    )

}

const navStyle = {
    display: 'flex',
    width: "100%",
    height: "6vh",
    backgroundColor: "#FF533D",
    padding: '1vh 0vh 1vh 0vh',
    justifyContent: "space-evenly",
    alignItems: "center"
};
const linkStyle = {
    textDecoration: 'none'
}
const headerStyle = {
    fontSize: 24,
    margin: 0,
    marginLeft: 0,
    color: '#F5F5F5',
    alignText: 'center'
};

export default Nav;