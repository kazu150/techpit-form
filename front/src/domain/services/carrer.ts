import { Carrer } from '../entity/carrer';

export const exitEmptyCarrers = (carrers: Carrer[]) =>
    carrers.some(c => isEmptyCarrer(c));

const isEmptyCarrer = (carrer: Carrer) => {
    return Object.values(carrer).every(v => !v);
};