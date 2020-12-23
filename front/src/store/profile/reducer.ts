import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Profile } from '../../domain/entity/profile';
import profileActions from './actions';
import { Carrer } from '../../domain/entity/carrer';

const init: Profile = {
    name: "",
    description: "",
    birthday: "",
    gender: "",
    address: {
        postalcode: "",
        prefecture: "",
        city: "",
        restAddress: ""
    },
    carrers: [],
    college: {
        name: "",
        faculty: "",
        department: ""
    }
};

const initCarrer: Carrer = {
    company: '',
    position: '',
    startAt: '',
    endAt: ''
}

const profileReducer = reducerWithInitialState(init)
    .case(profileActions.setProfile,
        (state, payload) => ({
            ...state,
            ...payload
        })
    ).case(profileActions.setAddress, 
        (state, payload) => ({
            ...state,
            address: {...state.address, ...payload}
        })
    ).case(profileActions.searchAddress.done,
        (state, payload) => ({
            ...state,
            address: { ...state.address, ...payload.result }
        })
    ).case(profileActions.setCarrer,
        (state, payload) => ({
            ...state,
            carrers: state.carrers.map((c, i) =>
                i === payload.index ? { ...c, ...payload.carrer } : c
            )
        })
    ).case(profileActions.deleteCarrer, 
        (state, payload) => ({
        ...state,
            carrers: state.carrers.filter((_, i) => 
                i !== payload
            )
        })
    ).case(profileActions.addCarrer,
        state => ({
            ...state,
            carrers: [...state.carrers, initCarrer]
        })
    ).case(profileActions.setCollege,
        (state, payload) => ({
            ...state,
            college: { ...state.college, ...payload }
        })
    );

export default profileReducer;