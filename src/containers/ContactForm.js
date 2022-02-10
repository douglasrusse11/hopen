import Amplify from "aws-amplify";
import { API } from 'aws-amplify';

import { Typography, Card, CardContent, Grid, TextField, Button } from '@material-ui/core'
import { useTranslation, Trans } from 'react-i18next';



async function addContact() {
  const data = {
    body: {
      name: formState.name,
      email: formState.email,
      message: formState.message
    }
  };

  console.log(data);
  const apiData = await API.post('formapp', '/contact', data);
  console.log({ apiData });
  alert('Mail sent');
}

const formState = { name: '', email: '', message: '' };

function updateFormState(key, value) {
  formState[key] = value;
}


const ContactForm = () => {

  const {t, i18n} = useTranslation();


  return (
    <div className="contact-form">

      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" align="center">
            {t('contact.contact')}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
            {t('contact.fillform')}
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} item>
                    <TextField label="Name" variant="outlined" fullWidth 
                      onChange={e => updateFormState('name', e.target.value)}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Email" variant="outlined" fullWidth 
                      onChange={e => updateFormState('email', e.target.value)}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label={t('contact.message')} placeholder={t('contact.message')} multiline rows={4} variant="outlined" fullWidth
                      onChange={e => updateFormState('message', e.target.value)}/> 
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth 
                    onClick={addContact}>{t('contact.submit')}</Button>   
                </Grid>

            </Grid>
          </form>
        </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default ContactForm;