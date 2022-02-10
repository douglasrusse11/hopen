import athens from './athens.jpg'
import { useTranslation, Trans } from 'react-i18next';

const Home = () => {

    const {t, i18n} = useTranslation();

    return (
        <div style={styles.container}>
            <h2 style={styles.homeHeader}>{t('home.homeHeader')}</h2>
            <p style={styles.homeText}>{t('home.homeText')}</p>
            <img src={athens} alt="Athens" style={styles.image}/>
        </div>
    )
}

const styles = {
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '8vh',
    },
    homeHeader: {
        fontSize: 40,
        color: '#0F1626'
    },
    homeText: {
        fontSize: 30,
        color: '#0F1626'
    },
    image: {
        height: '40vh',
        width: 'auto'
    }
}

export default Home;