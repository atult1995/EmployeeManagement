import { Component, OnInit } from '@angular/core';
import { COMPANY, DESIGNATION, User } from '../../helpher/helpher';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, mapTo, Subject, timer } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  designations = DESIGNATION;
  companies = COMPANY;
  empEntryForm: FormGroup;
  error$ = new BehaviorSubject<boolean>(false);
  editMode: boolean = false;
  userId: string = '';
  isLoading: boolean = false;
  imgUrl = '../assets/avatar/';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    if (userId) {
      this.onEditForm(userId);
      this.editMode = true;
      this.userId = userId;
    }

    this.initForm();
  }

  initForm(): void {
    this.empEntryForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      contactNo: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required]),
      designation: new FormControl(null, [Validators.required]),
      avatar: new FormControl(null, [Validators.required]),
    });
  }

  onSubmitForm(userId?: string): void {
    if (this.empEntryForm.valid) {
      this.isLoading = true;
      let user: User = {
        id: '',
        name: '',
        email: '',
        contactNo: 0,
        company: '',
        designation: '',
        avatar: '',
      };
      user = this.empEntryForm.value;
      user = { ...user, contactNo: Number(user.contactNo) };
      let request;
      if (this.editMode) {
        user = { ...user, contactNo: Number(user.contactNo), id: this.userId };
        request = this.userService.onSubmitEditDetails(user);
      } else {
        request = this.userService.onSubmitEmployeeDetails(user);
      }
      request.subscribe({
        next: (res) => {
          this.isLoading = false;
          this.router.navigate(['/user']);
        },
        error: (e) => {
          this.error$.next(true);
          this.isLoading = false;
          timer(5000).pipe(mapTo(false)).subscribe(this.error$);
        },
      });
    } else {
      console.log('form invalid', this.empEntryForm.errors);
    }
  }
  onEditForm(userId: string): void {
    this.userService.getEmployeeById(userId).subscribe({
      next: (res) => {
        this.pathValueToForm(res);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  pathValueToForm(user: User): void {
    this.empEntryForm.patchValue(user);
  }
}
