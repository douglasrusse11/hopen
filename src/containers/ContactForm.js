import Amplify from "aws-amplify";
import { API } from 'aws-amplify';
import { Typography, Card, CardContent, Grid, TextField, Button } from '@material-ui/core'

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

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
  return (
    <div className="contact-form">

      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" align="center">
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Fill up the form and we will get back to you as soon as possible
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
                    <TextField label="Message" placeholder="Message" multiline rows={4} variant="outlined" fullWidth
                      onChange={e => updateFormState('message', e.target.value)}/> 
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth 
                    onClick={addContact}>submit</Button>   
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