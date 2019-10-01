import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { OrderModel } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private apiURL = environment.apiTest;

    constructor(
        private http: HttpClient
    ) { }

    public createOrder(model: OrderModel): Observable<ResponseModel<OrderModel>> {
        return this.http.post<ResponseModel<OrderModel>>(this.apiURL + 'orders/createOrder', model);
    }

    public getAllByUserId(userId: string): Observable<ResponseModel<OrderModel[]>> {
        return this.http.get<ResponseModel<OrderModel[]>>(this.apiURL + `orders/getAllByUserId?userId=${userId}`);
    }

    public getAll(): Observable<ResponseModel<OrderModel[]>> {
        return this.http.get<ResponseModel<OrderModel[]>>(this.apiURL + 'orders/getAllOrders');
    }

    public getOrderById(orderId: string): Observable<ResponseModel<OrderModel>> {
        return this.http.get<ResponseModel<OrderModel>>(this.apiURL + `orders/getOrderById?orderId=${orderId}`);
    }

    public updateOrder(model: OrderModel): Observable<ResponseModel<OrderModel>> {
        return this.http.post<ResponseModel<OrderModel>>(this.apiURL + `orders/updateOrder`, model);
    }

    public getFewOrder(skip: number, limit: number, type: number): Observable<ResponseModel<OrderModel[]>> {
        return this.http.get<ResponseModel<OrderModel[]>>(this.apiURL + `orders/getFewOrder?skip=${skip}&limit=${limit}&limit=${type}`);
    }
}