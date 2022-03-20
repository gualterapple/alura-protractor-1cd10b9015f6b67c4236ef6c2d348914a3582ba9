import { ErrorHandler, Injectable, Injector } from "@angular/core";
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
import { from } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { UserService } from "../../core/services/user/user.service";
import { ServerLogService } from "./server-log.service";

const groupColor = 'color: red; font-weight: bold';

const stackAsArrayToString = (stackAsArray: StackTrace.StackFrame[]) =>
    stackAsArray.map(sf => sf.toString()).join('\n');

const logToConsole = ({message, userName, acessedUrl, stackAsString}) => {
    console.log('%cERROR MESSAGE:', groupColor);
    console.log(`%cERROR Error: ${message}`, 'font-size: 13px; font-weight: bold');
    console.log('%cSTACKTRACE', groupColor);
    console.log(stackAsString);
    console.log('%cUSER INFO:', groupColor);
    console.table({userName, acessedUrl});
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    private location: LocationStrategy;
    private userService: UserService;
    private serverLogService: ServerLogService;
    private router: Router;
    private dependenciesInjected = false;

    constructor(private injector: Injector) {}

    handleError(error: any): void {

        if(!this.dependenciesInjected) this.injectDependencies();

        const acessedUrl = this.location instanceof PathLocationStrategy
            ? this.location.path()
            : '';

        const message = error.message
            ? error.message :
            error.toString();

        if(environment.production) this.router.navigate(['/error']);

        from(StackTrace.fromError(error))
            .pipe(map(stackAsArrayToString))
            .pipe(withLatestFrom(this.userService.getUser$()))
            .pipe(
                switchMap(([stackAsString, user]) =>  {
                    const log = {
                        message,
                        userName: user ? user.name : 'not logged',
                        acessedUrl,
                        stackAsString
                    };
                    logToConsole(log);
                    return this.serverLogService.log(log);
                })
            )
            .subscribe(
                () => console.log('Error logged on server'),
                () => console.log('Fail to send error log to server')
            );
    }

    private injectDependencies() {
        this.location = this.injector.get(LocationStrategy);
        this.userService = this.injector.get(UserService);
        this.serverLogService = this.injector.get(ServerLogService);
        this.router = this.injector.get(Router);
        this.dependenciesInjected = true;
    }
}

