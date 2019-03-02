import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private accountService: AccountService,
    private titleService: Title
    //ในprofileมีserviceที่ถูกบอกให้สรา้ง2service
    //FormBuilderเป็นservice
    //ตอนนี้กำลงัสรา้serviceเป็นของตัวเอง
  ) { 
    this.titleService.setTitle('Profile');
  }
  //เอาค่าจากaccount serviceเอามาในform
  ngOnInit() {
    const {firstName,lastName} = this.accountService.account;
    const v =  [Validators.required, Validators.minLength(3)]
    this.form = this.fb.group({
      firstName: [firstName, v ],
      lastName: [lastName , [...v, Validators.maxLength(10)]]
    });
  }

  onSubmit(form: FormGroup){
    if(form.valid){
      const {firstName, lastName} = form.value;
      const account = new Account(firstName, lastName);
      this.accountService.account = account;
      // alert('You input firstname' + firstName + 'and lastname is' + lastName);

      // console.log(form)
      
    } else{
      alert('gg')
    }

    
  }

}
