import React from 'react';
import { TextField, Grid, InputLabel, Typography, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../domain/entity/rootState';
import {Carrer as ICarrer} from '../domain/entity/carrer';
import profileActions from '../store/profile/actions';
import { PROFILE } from '../domain/services/profile';
import { exitEmptyCarrers } from '../domain/services/carrer';

import useStyles from './styles';

const Carrer = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const carrers = useSelector((state: RootState) => state.profile.carrers);
    const isAbleToAddCarrer = exitEmptyCarrers(carrers);

    const handleChange = (member: Partial<ICarrer>, i: number) => {
        dispatch(profileActions.setCarrer({ carrer: member, index: i }));
    }
    const handleAddCarrer = () => {
        dispatch(profileActions.addCarrer({}));
    };
    const handleDeleteCarrer = (i: number) => {
        dispatch(profileActions.deleteCarrer(i))
    }


    return(
        <React.Fragment>
            {carrers.map((c, i) => (
                <React.Fragment key={i}>
                    <Typography variant="h5" component="h3" className={classes.title}>
                        職歴 {i + 1}
                    </Typography>
                    <TextField
                        className={classes.formField}
                        fullWidth
                        label={PROFILE.CARRERS.COMPANY}
                        value={c.company}
                        onChange={e => handleChange({company: e.target.value}, i)}
                    />
                    <TextField
                        className={classes.formField}
                        fullWidth
                        label={PROFILE.CARRERS.POSITION}
                        value={c.position}
                        onChange={e => handleChange({position: e.target.value}, i)}
                    />
                    <div className={classes.careerSpan}>
                        <InputLabel shrink>{PROFILE.CARRERS.SPAN}</InputLabel>
                        <Grid
                            container
                            spacing={1}
                            alignContent="space-between"
                            alignItems="center">
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    type='month'
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    value={c.startAt}
                                    onChange={e => handleChange({startAt: e.target.value}, i)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="center">〜</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    type='month'
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    value={c.endAt}
                                    onChange={e => handleChange({endAt: e.target.value}, i)}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <Button
                        className={classes.button}
                        onClick={() => handleDeleteCarrer(i)}
                        fullWidth
                        variant="outlined"
                        color="secondary"
                    >
                        職歴 {i + 1}を削除
                    </Button>
                </React.Fragment>
            ))}
            <Button
                className={classes.button}
                onClick={handleAddCarrer}
                fullWidth
                variant='outlined'
                disabled={isAbleToAddCarrer}
            >
                職歴を追加
            </Button>
        </React.Fragment>
    );
}

export default Carrer;