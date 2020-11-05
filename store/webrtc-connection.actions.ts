import { Action } from '@ngrx/store';
import { WebrtcConnection } from './webrtc-connection.model';
import { Update } from '@ngrx/entity/src/models';

export enum WebrtcConnectionActionTypes {
  LoadWebrtcConnections = '[WebrtcConnection] Load WebrtcConnections',
  AddWebrtcConnection = '[WebrtcConnection] Add WebrtcConnection',
  UpsertWebrtcConnection = '[WebrtcConnection] Upsert WebrtcConnection',
  AddWebrtcConnections = '[WebrtcConnection] Add WebrtcConnections',
  UpsertWebrtcConnections = '[WebrtcConnection] Upsert WebrtcConnections',
  UpdateWebrtcConnection = '[WebrtcConnection] Update WebrtcConnection',
  UpdateWebrtcConnections = '[WebrtcConnection] Update WebrtcConnections',
  DeleteWebrtcConnection = '[WebrtcConnection] Delete WebrtcConnection',
  DeleteWebrtcConnections = '[WebrtcConnection] Delete WebrtcConnections',
  ClearWebrtcConnections = '[WebrtcConnection] Clear WebrtcConnections'
}

export class LoadWebrtcConnections implements Action {
  readonly type = WebrtcConnectionActionTypes.LoadWebrtcConnections;

  constructor(public payload: { webrtcConnections: WebrtcConnection[] }) {}
}

export class AddWebrtcConnection implements Action {
  readonly type = WebrtcConnectionActionTypes.AddWebrtcConnection;

  constructor(public payload: { webrtcConnection: WebrtcConnection }) {}
}

export class UpsertWebrtcConnection implements Action {
  readonly type = WebrtcConnectionActionTypes.UpsertWebrtcConnection;

  constructor(public payload: { webrtcConnection: Update<WebrtcConnection> }) {}
}

export class AddWebrtcConnections implements Action {
  readonly type = WebrtcConnectionActionTypes.AddWebrtcConnections;

  constructor(public payload: { webrtcConnections: WebrtcConnection[] }) {}
}

export class UpsertWebrtcConnections implements Action {
  readonly type = WebrtcConnectionActionTypes.UpsertWebrtcConnections;

  constructor(public payload: { webrtcConnections: Update<WebrtcConnection>[] }) {}
}

export class UpdateWebrtcConnection implements Action {
  readonly type = WebrtcConnectionActionTypes.UpdateWebrtcConnection;

  constructor(public payload: { webrtcConnection: Update<WebrtcConnection> }) {}
}

export class UpdateWebrtcConnections implements Action {
  readonly type = WebrtcConnectionActionTypes.UpdateWebrtcConnections;

  constructor(public payload: { webrtcConnections: Update<WebrtcConnection>[] }) {}
}

export class DeleteWebrtcConnection implements Action {
  readonly type = WebrtcConnectionActionTypes.DeleteWebrtcConnection;

  constructor(public payload: { id: string }) {}
}

export class DeleteWebrtcConnections implements Action {
  readonly type = WebrtcConnectionActionTypes.DeleteWebrtcConnections;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearWebrtcConnections implements Action {
  readonly type = WebrtcConnectionActionTypes.ClearWebrtcConnections;
}

export type WebrtcConnectionActions =
 LoadWebrtcConnections
 | AddWebrtcConnection
 | UpsertWebrtcConnection
 | AddWebrtcConnections
 | UpsertWebrtcConnections
 | UpdateWebrtcConnection
 | UpdateWebrtcConnections
 | DeleteWebrtcConnection
 | DeleteWebrtcConnections
 | ClearWebrtcConnections;
