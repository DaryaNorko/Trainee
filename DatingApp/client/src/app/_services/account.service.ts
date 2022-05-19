import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

// этот сервис для того, чтобы засовывать user в localStorage при регистриции или логине. Или удалять его оттуда(logout()).

export class AccountService {
  baseUrl = environment.apiUrl;
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
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          // c пом. метода next мы засовываем в currentUserSource user
        }
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role; // role - название свойства. Там может быть и больше 1-й роли.
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
          // localStorage - локальное хранилище в браузере. туда засовывается юзер
    this.currentUserSource.next(user);
  } //перезапись юзера

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    // чистим, чтобы были одинковые данные (то есть null везде)
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
 