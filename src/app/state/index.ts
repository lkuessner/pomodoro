import { MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
