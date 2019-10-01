import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = environment.apiTest;
  private currentUpdatedUser: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiURL + 'users');
  }

  getUserById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiURL + `users/getUserById?_id=${id}`);
  }

  getUserByUsername(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiURL + `users/getUserByUsername?username=${username}`);
  }

  createUser(model: UserModel): Observable<ResponseModel<UserModel>>  {
    model.registrationDate = new Date();
    return this.http.post<ResponseModel<UserModel>>(this.apiURL + 'users/create', model);
  }

  updateUser(model: UserModel): Observable<ResponseModel<UserModel>> {
    return this.http.post<ResponseModel<UserModel>>(this.apiURL + 'users/updateUser', model);
  }

  uploadAvatar(image: File, id: string): Observable<ResponseModel<UserModel>> {
    const formData = new FormData();
    formData.append('file', image as File);
    return this.http.post<ResponseModel<UserModel>>(this.apiURL + `users/image?_id=${id}`, formData, { headers: null });
  }

  getAvatar(id: string): Observable<string> {
    return this.http.get<string>(this.apiURL + `users/uploads/avatars/${id}`)
  }

  uploadImage(image: File, id: string): Observable<ResponseModel<UserModel>> {
    const formData = new FormData();
    formData.append('file', image as File);
    return this.http.post<ResponseModel<UserModel>>(this.apiURL + `users/image?_id=${id}`, formData, { headers: null });
  }

  deleteUser(id: string): Observable<string> {
    return this.http.get<string>(this.apiURL + `users/deleteUser?_id=${id}`)
  }

  public getUpdatedUser(): Observable<UserModel> {
    return this.currentUpdatedUser.asObservable();
  }

  public setUpdatedUser(user): void {
    this.currentUpdatedUser.next(user);
  }
}
