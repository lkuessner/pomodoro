import { MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './hydration/hydration.reducer';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
