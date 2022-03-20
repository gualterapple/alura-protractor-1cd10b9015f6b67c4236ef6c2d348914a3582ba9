import { Injectable } from '@angular/core';
import { fromEvent, Subject, Observable } from 'rxjs';
import { ConnectionStatus } from './connection-status';

@Injectable({providedIn: 'root'})
export class ConnectionStatusService {

    private connectionStatusSubject = new Subject<ConnectionStatus>();
    private connectionStatus$: Observable<ConnectionStatus> 

    constructor() {
        this.connectionStatus$ = this.connectionStatusSubject.asObservable();
        fromEvent(window, 'online').subscribe(() => 
            this.connectionStatusSubject.next({ online: true}));
        fromEvent(window, 'offline').subscribe(() => 
            this.connectionStatusSubject.next({ online: false}));
    }

    getConnectionStatus$() {
        return this.connectionStatus$;
    }
}