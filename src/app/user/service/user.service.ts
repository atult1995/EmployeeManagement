import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response, USER, User } from '../helpher/helpher';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users = [
    {
      name: 'Atul Prakash',
      email: 'prakashatul54@gmail.com',
      contactNo: 6260152855,
      company: 'XYZ',
      designation: 'sd',
      avatar: 'avatar3.jpeg',
      id: '30c7',
    },
    {
      name: 'Vaibhav Kumar',
      email: 'vaib@gmail.com',
      contactNo: 777878,
      company: 'DEF',
      designation: 'ssd',
      avatar: 'avatar2.jpeg',
      id: '30c8',
    },
    {
      name: 'Suresh Kumar',
      email: 'su@gmail.com',
      contactNo: 777878,
      company: 'ABC',
      designation: 'qa',
      avatar: 'avatar3.jpeg',
      id: '30c9',
    },
    {
      name: 'Mukesh Kumar',
      email: 'Mu@gmail.com',
      contactNo: 777878,
      company: 'ABC',
      designation: 'tlm',
      avatar: 'avatar1.jpeg',
      id: '30c10',
    },
  ];
  constructor(private http: HttpClient) {}
  //1st version
  // getEmployee(): Observable<User[]> {
  //   return this.http.get<User[]>('http://localhost:9000/employees');
  // }

  // onSubmitEmployeeDetails(user: User): Observable<User> {
  //   return this.http.post<User>('http://localhost:9000/employees', user);
  // }

  // getEmployeeById(userId: string): Observable<User> {
  //   return this.http.get<User>('http://localhost:9000/employees/' + userId);
  // }

  // deleteEmployee(userId: string): Observable<User[]> {
  //   return this.http.delete<User[]>(
  //     'http://localhost:9000/employees/' + userId
  //   );
  // }
  // onSubmitEditDetails(user: User): Observable<User> {
  //   console.log(user);
  //   return this.http.put<User>(
  //     'http://localhost:9000/employees/' + user.id,
  //     user
  //   );
  // }

  //2nd version
  getEmployee(): Observable<User[]> {
    return new BehaviorSubject(this.users).asObservable();
  }

  onSubmitEmployeeDetails(user: User): Observable<any> {
    let existingUser = this.users.find((u) => u.email === user.email);
    if (existingUser) {
      return new BehaviorSubject<any>({
        code: 400,
        message: 'User already exist',
      }).asObservable();
    }
    this.users.push(user);
    return new BehaviorSubject<any>({
      code: 200,
      response: user,
      message: 'Created successfully',
    }).asObservable();
  }

  getEmployeeById(userId: string): Observable<User> {
    let tempUser = USER;
    let findUser = this.users.find((u) => u.id === userId);
    return new BehaviorSubject(findUser || tempUser).asObservable();
  }

  deleteEmployee(userId: string): Observable<User[]> {
    this.users = this.users.filter((u) => u.id !== userId);
    return new BehaviorSubject(this.users).asObservable();
  }
  onSubmitEditDetails(user: User): Observable<User> {
    this.users = this.users.filter((u) => u.id !== user.id);
    this.users.push(user);
    return new BehaviorSubject(user).asObservable();
  }
}
