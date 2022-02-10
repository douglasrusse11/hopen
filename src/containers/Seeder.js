import {useState} from 'react';
import {DataStore, Predicates} from '@aws-amplify/datastore';
import {Resource} from '../models';
import {withAuthenticator} from '@aws-amplify/ui-react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, TextField } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#ff533d',
        darker: '#ff1e00'
      },
    },
  });

const Seeder = ({client}) => {

    const {t, i18n} = useTranslation();

    const [data, setData] = useState("")

    const onChange = (e) => {
        setData(e.target.value);
    }

    const processData = async () => {
        if (!data) return;
        await DataStore.delete(Resource, Predicates.ALL);
        const splitData = data.split('\n');
        const resources = [];
        for (let i=1; i < splitData.length; i++) {
            let [category, name, address, phoneNumber, emailAddress, openingHours, description] = splitData[i].split('\t');
            if (category.split(' ').length > 1) {
                category = category.split(' ')[0];
            }
            const resource = {
                category: category,
                name: name,
                address: address,
                phoneNumber: phoneNumber,
                emailAddress: emailAddress,
                openingHours: openingHours,
                description: description
            };
            resources.push(resource);
        }
        resources.forEach(async resource => {
            await client.searchPlaceIndexForText({IndexName: "AthensIndex", Text: resource.address, FilterCountries: ["GRC"], MaxResults: '1'}, (err, data) => {
                if (err) console.error(err);
                if (data) {
                    resource.latlng = [data.Results[0].Place.Geometry.Point[1], data.Results[0].Place.Geometry.Point[0]];
                    DataStore.save(new Resource({...resource}))
                };
            })
        });
        setData("")
    }


    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%"}}>
            <TextField name="data" onChange={onChange} variant="outlined" multiline rows="25" label="Copy and paste the content of your spreadsheet here" value={data} style={{width: "60vw", marginBottom: 10, borderRadius: 10, backgroundImage: "url(/flamingo.jpg)", backgroundSize: "cover"}} />
            <Button variant="contained" color="primary" onClick={processData} style={{width: "60vw"}}>{t('home.db') }</Button>
        </div>
    )

}

export default withAuthenticator(Seeder);