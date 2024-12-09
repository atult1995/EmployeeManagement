import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  combineLatest,
  map,
  tap,
  timer,
  mapTo,
  Subject,
} from 'rxjs';
import { DESIGNATION, User } from '../../helpher/helpher';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imgUrl = '../assets/avatar/';
  searchText = '';
  designations = DESIGNATION;
  users$ = this.userService.getEmployee();
  searchEvent$ = new BehaviorSubject<string>('');
  refreshTrigger$ = new BehaviorSubject<void>(undefined);

  filterCompanies$ = new BehaviorSubject<string[]>([]);
  filterDesignations$ = new BehaviorSubject<string[]>([]);

  //fetch user, filter, search logic
  filteredData$ = combineLatest([
    this.users$,
    this.searchEvent$.pipe(debounceTime(500), distinctUntilChanged()),
    this.filterCompanies$,
    this.filterDesignations$,
    this.refreshTrigger$,
  ]).pipe(
    switchMap(([users, searchText, filterCom, filterDes]) =>
      this.userService.getEmployee().pipe(
        map((users) => {
          //start with filter
          //start with company filter
          console.log(filterCom, filterDes);
          let tempUsers: User[] = [];
          if (filterCom.length > 0) {
            filterCom.forEach((fc) => {
              users.forEach((user) => {
                if (user.company === fc) {
                  //lets check if that user is not already there
                  const existingUser = tempUsers.find((u) => u.id === user.id);
                  if (!existingUser) tempUsers.push(user);
                }
              });
            });
          }
          //applying designation filter
          if (filterDes.length > 0) {
            filterDes.forEach((fd) => {
              users.forEach((user) => {
                if (user.designation === fd) {
                  //lets check if that user is not already there
                  const existingUser = tempUsers.find((u) => u.id === user.id);
                  if (!existingUser) tempUsers.push(user);
                }
              });
            });
          }
          //applying search on final result
          if (tempUsers.length > 0) {
            return tempUsers.filter((user) => {
              return (
                user.name
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase()) ||
                user.email
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase())
              );
            });
          } else {
            return users.filter((user) => {
              return (
                user.name
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase()) ||
                user.email
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase())
              );
            });
          }
        })
      )
    )
  );

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  onSearchInput(value: any): void {
    this.searchEvent$.next(this.searchText);
  }

  getFilters(event: any): void {
    this.filterCompanies$.next(event.filterCompanies);
    this.filterDesignations$.next(event.filterDesignations);
  }

  findDesignation(designationKey: string): string {
    return (
      this.designations.find((des) => des.designationKey === designationKey)
        ?.designationName || ''
    );
  }

  onUserDeleteConfirmClick(userId: string): any {
    return () => this.onDeleteUserClick(userId);
  }
  onDeleteUserClick(userId: string): void {
    this.userService.deleteEmployee(userId).subscribe({
      next: (res) => {
        this.refreshTrigger$.next();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
