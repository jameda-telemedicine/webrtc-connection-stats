import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { WebrtcConnection } from './webrtc-connection.model';
import { WebrtcConnectionActions, WebrtcConnectionActionTypes } from './webrtc-connection.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<WebrtcConnection> {
}

export const adapter: EntityAdapter<WebrtcConnection> = createEntityAdapter<WebrtcConnection>();

export const initialState: State = adapter.getInitialState({
    ids: ['local', 'remote'],
    entities: {'local': {id: 'local', bandwidth: 0}, 'remote': {id: 'remote', bandwidth: 0}}
});

export function reducer(
    state = initialState,
    action: WebrtcConnectionActions
): State {
    switch (action.type) {
        case WebrtcConnectionActionTypes.AddWebrtcConnection: {
            return adapter.addOne(action.payload.webrtcConnection, state);
        }

        case WebrtcConnectionActionTypes.AddWebrtcConnections: {
            return adapter.addMany(action.payload.webrtcConnections, state);
        }

        case WebrtcConnectionActionTypes.UpdateWebrtcConnection: {
            return adapter.updateOne(action.payload.webrtcConnection, state);
        }

        case WebrtcConnectionActionTypes.UpdateWebrtcConnections: {
            return adapter.updateMany(action.payload.webrtcConnections, state);
        }

        case WebrtcConnectionActionTypes.DeleteWebrtcConnection: {
            return adapter.removeOne(action.payload.id, state);
        }

        case WebrtcConnectionActionTypes.DeleteWebrtcConnections: {
            return adapter.removeMany(action.payload.ids, state);
        }

        case WebrtcConnectionActionTypes.LoadWebrtcConnections: {
            return adapter.addAll(action.payload.webrtcConnections, state);
        }

        case WebrtcConnectionActionTypes.ClearWebrtcConnections: {
            return adapter.removeAll(state);
        }

        default: {
            return state;
        }
    }
}

export const selectWebrtcConnectionState = createFeatureSelector<EntityState<WebrtcConnection>>('webrtcConnection');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();


export const selectWebrtcConnectionEntities = createSelector(
    selectWebrtcConnectionState,
    selectEntities
);

export const selectLocalWebrtcConnection = createSelector(
    selectWebrtcConnectionEntities,
    entities => entities['local']
);

export const selectRemoteWebrtcConnection = createSelector(
    selectWebrtcConnectionEntities,
    entities => entities['remote']
);
