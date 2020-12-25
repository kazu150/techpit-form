import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';

import { PROFILE } from '../domain/services/profile';
import { RootState } from '../domain/entity/rootState';
import { Address as IAddress } from '../domain/entity/address';

import profileActions from '../store/profile/actions';
import { isPostalcode } from '../domain/services/address';
import { searchAddressFromPostalcode } from '../store/profile/effects';
import { Profile } from '../domain/entity/profile';
import { calculateValidation } from '../domain/services/validation';
import validationActions from '../store/validation/actions';

import useStyles from './styles';

const Address = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile);
    const validation = useSelector((state: RootState) => state.validation);
    const classes = useStyles();

    const handleAddressChange = (member: Partial<IAddress>) => {
        dispatch(profileActions.setAddress(member));
        recalculateValidation({
            address: {...profile.address, ...member}
        });
    }

    const recalculateValidation = (member: Partial<Profile>) => {
        if(!validation.isStartValidation) return;
        const newProfile = {
            ...profile,
            ...member
        };
    
        const message = calculateValidation(newProfile);
        dispatch(validationActions.setValidation(message));
    }


    const handlePostalcodeChange = (code: string) => {
        if (!isPostalcode(code)) return; 
        dispatch(profileActions.setAddress({postalcode: code}));
        dispatch(searchAddressFromPostalcode(code))
    }

    return(
        <>
            <TextField
                fullWidth
                required
                error={!!validation.message.address.postalcode}
                helperText={validation.message.address.postalcode}
                className={classes.formField}
                label={PROFILE.ADDRESS.POSTALCODE}
                value={profile.address.postalcode}
                onChange={e => handlePostalcodeChange(e.target.value)}
            />
            <TextField
                fullWidth
                required
                error={!!validation.message.address.prefecture}
                helperText={validation.message.address.prefecture}
                className={classes.formField}
                label={PROFILE.ADDRESS.PREFECTURE}
                value={profile.address.prefecture}
                onChange={e => handleAddressChange({prefecture: e.target.value})}
            />
            <TextField
                fullWidth
                required
                error={!!validation.message.address.city}
                helperText={validation.message.address.city}
                className={classes.formField}
                label={PROFILE.ADDRESS.CITY}
                value={profile.address.city}
                onChange={e => handleAddressChange({city: e.target.value})}
            />
            <TextField
                fullWidth
                className={classes.formField}
                error={!!validation.message.address.restAddress}
                label={PROFILE.ADDRESS.RESTADDRESS}
                value={profile.address.restAddress}
                onChange={e => handleAddressChange({restAddress: e.target.value})}
            />
        </>
    );
}

export default Address;