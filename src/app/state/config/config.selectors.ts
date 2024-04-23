import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Config } from '../../interfaces/config';

export const selectConfigState = createFeatureSelector<Config>('config');

export const selectBookCollection = createSelector(
  selectConfigState,
  (config) => {
    return config;
  }
);
