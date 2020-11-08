import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Landmark } from '../_models';

@Injectable({ providedIn: 'root' })
export class LandmarkService {

    constructor(
        private http: HttpClient
    ) { }

    search(location: String, userid: number) {
        return this.http.get<Landmark[]>(`${environment.apiUrl}/landmarks/search/landmark/${location}/${userid}`);
    }
}
