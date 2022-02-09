import { useState } from 'react';
import { ResourceType } from '../models';
import { useTranslation, Trans } from 'react-i18next';
import { Button, MenuItem, Select, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

const Form = ({onSubmit, onClose, formData, setFormData, client}) => {

    const [addressList, setAddressList] = useState([])
    const [lastRequest, setLastRequest] = useState(Date.now());
    const {t, i18n} = useTranslation();

    const onChange = (e) => {
        if (e.target.name === 'lat') {
            setFormData({
                ...formData, latlng: [parseFloat(e.target.value), formData.latlng[1]]
            })
        } else if (e.target.name === 'lng') {
            setFormData({
                ...formData, latlng: [formData.latlng[0], parseFloat(e.target.value)]
            })
        } else if (e.target.name === 'address') {
            if (e.target.value && (Date.now() - lastRequest > 500)) {
                    client.searchPlaceIndexForText({IndexName: "AthensIndex", Text: e.target.value, FilterCountries: ["GRC"], MaxResults: '10'}, (err, data) => {
                        if (err) console.error(err);
                        if (data) {
                            setAddressList(data.Results)
                        };
                    })
                    setLastRequest(Date.now());
                }
            if (addressList.length !== 0) {
                setFormData({
                    ...formData, [e.target.name]: e.target.value, latlng: [parseFloat(addressList[0].Place.Geometry.Point[1]), parseFloat(addressList[0].Place.Geometry.Point[0])]
                })
            } else {
                setFormData({
                    ...formData, [e.target.name]: e.target.value
                })
            } 
        } else {
            setFormData({
                ...formData, [e.target.name]: e.target.value
            })
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Select name="category" onChange={onChange} defaultValue={formData.category} >
                    { Object.values(ResourceType).map((resourceType, index) => (
                            <MenuItem key={`resourceOption_${index}`} value={resourceType} >{resourceType}</MenuItem>
                    ))}
            </Select>
            <TextField type="text" label={t('form.name')} name="name" value={formData.name} onChange={onChange} />
            <Autocomplete  
                freeSolo
                options={addressList}
                defaultValue={{Place: {Label: formData.address}}}
                getOptionLabel={option => option.Place.Label}
                renderInput={(params) => <TextField {...params} label={t('form.address')} name="address" onChange={onChange} />} 
                />
            <TextField type="text" label={t('form.description')} name="description" value={formData.description} onChange={onChange} />
            <TextField type="text" label={t('form.phone')} name="phoneNumber" value={formData.phoneNumber} onChange={onChange} />
            <TextField type="text" label={t('form.email')} name="emailAddress" value={formData.emailAddress} onChange={onChange} />
            <TextField type="text" label={t('form.hours')} name="openingHours" value={formData.openingHours} onChange={onChange} />
            <TextField type="number" label="Latitude" name="lat" value={formData.latlng[0]} step="0.00001" onChange={onChange} />
            <TextField type="number" label="Longitude" name="lng" value={formData.latlng[1]} step="0.00001" onChange={onChange} />
            <Button onClick={onSubmit} variant="contained" color="secondary" style={buttonStyle}>{t('form.submit')}</Button>
            <Button onClick={onClose} variant="contained" color="secondary" style={buttonStyle}>{t('form.close')}</Button>
        </div>
    )
}

const buttonStyle = {
    marginTop: 3
}

export default Form;