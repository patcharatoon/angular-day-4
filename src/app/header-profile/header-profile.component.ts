import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {

  //วิธีการใช้service
  //accountService: AccountService;

  //private account: Account 
  constructor(
  //typeชื่อclassของservice  คือ AccountSevice
  //มันใช้ได้แต่ในconstructor ถ้าไม่มีprivate
  // public ถ้านำมาใช้ในcomponentจะมีความสำคัญระดับนึง
  public accountService: AccountService
  ) { 
   // this.accountService = accountService;
   console.log(this.accountService.account)
  }

  ngOnInit() {
  }

}
