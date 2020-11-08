import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandmarkService, LandmarkSignalRService } from '../_services';
import { Landmark, User } from '../_models';
import { AccountService } from '../_services';

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
  form: FormGroup;
  landmarksArr: Landmark[] = [];
  landmarkSubscription: Subscription;
  l: Landmark;
  processing: boolean = false;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private landmarkService: LandmarkService,
    public landmarkSignalRService: LandmarkSignalRService,
    private accountService: AccountService) 
    {
       this.user = this.accountService.userValue;
     }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      location: ['', Validators.required],
    });

    this.landmarkSignalRService.startConnection();
    this.landmarkSignalRService.addPhotoDataListener();
    
    this.landmarkSubscription = this.landmarkSignalRService.onData()
    .subscribe(data => {
      this.processing = false;
      this.landmarksArr.push(data);
    });

  }

  ngOnSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.processing = true;

    //clear the results
    this.landmarksArr = [];

    let location = this.form.get('location').value;
    let userid = 0;
    if(this.user)
      userid = parseInt(this.user.id);

    this.landmarkService.search(location, userid)
      .pipe(first())
      .subscribe();
  }

  ngOnDestroy() {
    this.landmarkSignalRService.stopConnection();
  }

}
