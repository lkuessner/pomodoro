import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfigState, IConfigService } from '../../interfaces/config';
import { ConfigActions } from '../../state/config/config.actions';

@Injectable({
  providedIn: 'root',
})
export class ConfigService implements IConfigService {
  constructor(private store: Store) {}

  /* Actions */
  updateConfigState = (values: ConfigState) => {
    this.store.dispatch(ConfigActions.updateConfigState(values));
  };
}
