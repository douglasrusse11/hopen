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
                    <TextField label={t('contact.name')} variant="outlined" fullWidth required
                      onChange={e => updateFormState('name', e.target.value)}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label={t('contact.message')} variant="outlined" type="email" required
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
    
     
    //   <TextField
    //     id="outlined-basic" 
    //     label="Name"
    //     variant="outlined"
    //     type="text"
    //     required
    //     onChange={e => updateFormState('name', e.target.value)}
    //     />

    //     <br />

    //   <TextField
    //     id="outlined-basic"
    //     label="Email"
    //     variant="outlined"
    //     type="email"
    //     required
    //     onChange={e => updateFormState('email', e.target.value)}
    //     />

    //     <br />

    //   <TextField
    //     id="standard-multiline-flexible"
    //     label="Message"
    //     placeholder="Message"
    //     variant="outlined"
    //     multiline
    //     rowsMax={6}
    //     required
    //     type="text"
    //     onChange={e => updateFormState('message', e.target.value)}
    //     />

    //     <br />

    //   <Button variant="outlined" onClick={addContact}>submit</Button>
      
     
    //   </div>

    
    // <Container>
    // <div>
    //   <h3>{t('contact.intro')}</h3>
    //   <br/>
    //     <Form>
    //       <Form.Group>
    //         <Form.Label>{t('contact.name')}</Form.Label>
    //         <Form.Control placeholder={t('contact.name')} onChange={e => updateFormState('name', e.target.value)} />
    //       </Form.Group>
    //       <Form.Group>
    //         <Form.Label>{t('contact.email')}</Form.Label>
    //         <Form.Control placeholder={t('contact.email')} onChange={e => updateFormState('email', e.target.value)} />
    //       </Form.Group>
    //       <Form.Group>
    //         <Form.Label>{t('contact.message')}</Form.Label>
    //         <Form.Control placeholder={t('contact.message')} onChange={e => updateFormState('message', e.target.value)} />
    //       </Form.Group>
    //       <Button onClick={addContact}>{t('contact.send')}</Button>
    //     </Form>
    //   </div>
    // </Container>
    // <>
    //   <CssBaseline />
    //   <AppBar position="relative">
    //     <Toolbar >
    //       <ConnectWithoutContactIcon />
    //         <Typography gutterBottom variant="h6">
    //           Get in touch
    //         </Typography>
    //     </Toolbar>
    //   </AppBar>
    //   <main>
    //     <div><

    //     >
    //   </main>
    // </>
   
  );
}

export default ContactForm;