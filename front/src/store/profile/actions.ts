import actionCreatorFactory from 'typescript-fsa';
import { Profile } from '../../domain/entity/profile';
import { Address } from '../../domain/entity/address';
import { Carrer } from '../../domain/entity/carrer';
import { College } from '../../domain/entity/college';

const actionCreator = actionCreatorFactory();

const profileActions = {
    setProfile: actionCreator<Partial<Profile>>('SET_PROFILE'),
    setAddress: actionCreator<Partial<Address>>('SET_ADDRESS'),
    searchAddress: actionCreator.async<{}, Partial<Address>, {}>('SEARCH_ADDRESS'),
    setCarrer: actionCreator<{ carrer: Partial<Carrer>; index: number}>(
        'SET_CAREER'
    ),
    deleteCarrer: actionCreator<number>('DELETE_CAREER'),
    addCarrer: actionCreator<{}>('ADD_CAREER'),
    setCollege: actionCreator<Partial<College>>('SET_COLLEGE')
};

export default profileActions;