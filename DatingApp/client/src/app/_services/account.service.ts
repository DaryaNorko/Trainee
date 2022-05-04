import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1); // мы обещаем, что туда когда-нибудь попадёт 1 объект user
  currentUser$ = this.currentUserSource.asObservable(); // асинхронность для js. мы ждем ответа от сервака, поэтому асинхронно

  constructor(private http: HttpClient) { }
  // даёт обертку чтобы обращаться к серверу

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      // в него прописываем нес-ко функций, и когда придёт ответ с сервера, мы прогоняем его по этим функциям
      map((response: User) => { // преобразовывает каждый элемент как мне надо
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          // localStorage - локальное хранилище в браузере. туда засовывается юзер
          this.currentUserSource.next(user);
          // c пом. метода next мы засовываем в currentUserSource user
        }
      })
    )

  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  } //перезапись юзера

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    // чистим, чтобы были одинковые данные (то есть null везде)
  }
}
 