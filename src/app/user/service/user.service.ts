import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../helpher/helpher';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getEmployee(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:9000/employees');
  }

  onSubmitEmployeeDetails(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:9000/employees', user);
  }

  getEmployeeById(userId: string): Observable<User> {
    return this.http.get<User>('http://localhost:9000/employees/' + userId);
  }

  deleteEmployee(userId: string): Observable<User[]> {
    return this.http.delete<User[]>(
      'http://localhost:9000/employees/' + userId
    );
  }
  onSubmitEditDetails(user: User): Observable<User> {
    console.log(user);
    return this.http.put<User>(
      'http://localhost:9000/employees/' + user.id,
      user
    );
  }
}
