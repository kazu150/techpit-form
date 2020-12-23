import { Gender } from './gender';
import { Address } from './address';
import { Carrer } from './carrer';
import { College } from './college';

export type Profile = {
    name: string;
    description: string;
    birthday: string;
    gender: Gender;
    address: Address;
    college: College;
    carrers: Carrer[];
};