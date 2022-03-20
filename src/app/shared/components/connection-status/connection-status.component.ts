import { Component, OnInit } from '@angular/core';
import { ConnectionStatus } from './connection-status';
import { ConnectionStatusService } from './connection-status-service';


@Component({
    selector: 'ap-connection-status',
    templateUrl: './connection-status.component.html',
    styleUrls: ['./connection-status.component.scss']
})
export class ConnectionStatusComponent implements OnInit {

    connectionStatus: ConnectionStatus = { online: false };
    message = '';
    show = false;
    
    constructor(
        private connectionStatusService: ConnectionStatusService
    ) {}
    
    ngOnInit(): void {

        this.connectionStatusService
            .getConnectionStatus$()
            .subscribe(currentStatus => {
                this.show = true;
                this.connectionStatus = currentStatus;
                this.message = currentStatus.online  
                    ? 'Connection established' : 'Offline! Please, verify your connection';
                if(currentStatus.online) setTimeout(() => this.show = false, 3000);
            }); 
    }

    private isFromOfflineToOnline(previousStatus: ConnectionStatus, currentStatus: ConnectionStatus) {
        return !previousStatus.online && currentStatus.online;
    }
}

/* termina observable e emite o valor
this.connectionStatus$ = this.connectionStatusService
            .getConnectionStatus$()
            .pipe(
                tap(connectionStatus => 
                    this.message = connectionStatus.online  
                    ? 'Connection established' : 'Offline! Please, verify your connection'
                )
            )
            .pipe(first())
            .pipe(concat(of(null)));

            this.connectionStatus$.subscribe(console.log);
*/            