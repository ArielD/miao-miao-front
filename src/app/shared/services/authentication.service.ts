import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());
    public currentUser: Observable<UserModel>;
    private apiURL = environment.apiTest;

    constructor(
        private http: HttpClient
    ) { }

    createUser(model: UserModel): Observable<UserModel> {
        model.registrationDate = new Date();
        model.role = "User";
        return this.http.post<UserModel>(this.apiURL + 'users/create', model);
    }

    signIn(model: { username: string, password: string }): Observable<string> {
        return this.http.post<string>(this.apiURL + 'auth/', model);
    }


    public getCurrentUser(): Observable<UserModel> {
        return this.http.post<UserModel>(this.apiURL + 'auth/getUser', JSON.parse(localStorage.getItem('token')));
    }

    public setCurrentUserSubject(user) {
         this.currentUserSubject.next(user);
    }

    public getCurrentUserSubject(): Observable<UserModel> {
        return this.currentUserSubject.asObservable()
   }

    public getCurrentUserValue(): UserModel {
         return this.currentUserSubject.getValue()
    }
}