import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Landmark } from '../_models';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LandmarkSignalRService {
    public data = new Subject<Landmark>();

    private hubConnection: signalR.HubConnection

    onData(): Observable<Landmark> {
        return this.data.asObservable();
    }

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:4000/landmarks')
            .build();

        this.hubConnection
            .start()
            .catch(err => console.log('Error while starting connection: ' + err))
    }

    public stopConnection = () => {
        this.hubConnection
            .stop()
            .catch(err => console.log('Error while stopping connection: ' + err))
    }

    public addPhotoDataListener = () => {
        this.hubConnection.on('transferphotodata', (data) => {
            this.data.next(data);
        });
    }

}