import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  baseDN: string = "o=domen1.rs,o=isp"; // u zavisnosti ko je ulogovan!!
  scope: string = 'SUB';
  filterString: string = "(uid=*)";
  userForm = new FormGroup({
    value: new FormControl()
  });

  category =
    [
      { id: 1, name: "People" },
      { id: 2, name: "Group" }
    ];
    selectedValue = null;
  filter = [
    { id: 1, attribute: "uid" },
    { id: 2, attribute: "cn" },
    { id: 3, attribute: "sn" },
    { id: 4, attribute: "mail" }
  ];
  selectedAttribute = null;
  
  constructor(private _userService: UserServiceService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.selectedValue !== null) {
      this.baseDN ="ou=" + this.selectedValue.name +","+ this.baseDN;
 
    }
    if(this.selectedAttribute !== null && this.userForm.value.value !== null) {
      this.filterString = "(" + this.selectedAttribute.attribute + "=" + this.userForm.value.value + ")";
    }

    this._userService.getUser(this.baseDN, this.scope, this.filterString)
    .subscribe(
      (data: any) => { console.log(JSON.stringify(data)); }
    );
   
  }

}
