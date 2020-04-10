import { Component, OnInit } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  constructor( private toastr: ToastrService,private browseService: BrowseService, private router: Router, private route : ActivatedRoute) { }
  authFormType: number;
  isAuthFormVisible: boolean;


  ngOnInit() {
    let token = this.route.snapshot.queryParamMap.get("token");
    console.log("token",token);
    this.browseService.activateAccount(token).then(result=>{
      this.toastr.success("your account activated successfully!!");
     // this.router.navigate(["/login"]);
     return this.showAuthForm(0);
    }).catch(err=>{
      this.isAuthFormVisible=false;
       // this.toastr.error("something is wromg");
    });
  }

  hideAuthForm() {
    this.authFormType = null;
    this.isAuthFormVisible = false;
  }

  showAuthForm(type = 0) {
    this.authFormType = type;
    this.isAuthFormVisible = true;
  }

}
