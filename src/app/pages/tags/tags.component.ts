import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { BrowseService } from 'src/app/services/browse.service';
import { ToastrService } from 'ngx-toastr';
//import { TagModel } from 'ngx-chips/core/accessor';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  selectedTagItems = [];
  inActiveTags=[];
  inactveTagItems=[];
  // tagsForm: any;
  searchText = '';
  tagsArray = [];
  tagsForm: FormGroup;
  tags='';
  allTag=[];
  inactiveTag= [];
  inactiveTags=[];
  allInactiveTag=[];
  allactiveTag=[];
  constructor(private formBuilder: FormBuilder,
    private browseService: BrowseService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getTagList();
    this.getInactiveTagList();
    this.getactiveTagList();
  }

  async getInactiveTagList() {
    const response: any = await this.browseService.getAllInactiveTagsList();
    this.allInactiveTag = response.data;
  
  }
  async getactiveTagList() {
    const response: any = await this.browseService.getAllactiveTagsList();
    this.allactiveTag = response.data;
    console.log('allactiveTag', this.allactiveTag);
    let tag=this.allactiveTag[0].tag;

    for(let i=1;i<this.allactiveTag.length-1;i++){
        tag=tag+","+this.allactiveTag[i].tag;
    }
    this.tags=tag;
   console.log("allTag", this.allactiveTag)
  }
  


  async getTagList() {
    const response: any = await this.browseService.getAllTagsList();
    this.allTag = response.data;
    console.log("allag",response.data);
  //   let tag=this.allTag[0].tag;

  //   for(let i=1;i<this.allTag.length-1;i++){
  //       tag=tag+","+this.allTag[i].tag;
  //   }
  //   this.tags=tag;
  //  console.log("allTag", this.allTag)
  }
  addTag() {
   
     this.selectedTagItems.forEach(t=>{
       this.tagsArray.push(t.tag);
     });

     let data={
       tags:this.tagsArray
     }
       this.browseService.createTagData(data).then(result=>{
        this.toastr.success("Tags created successfully!");
        this.tagsArray=[];
        this.selectedTagItems=[];
        this.ngOnInit();
       }).catch(err=>{
         console.log(err);
       });
      
    }
    removeTagFromList(tag:any){
      console.log("tag",tag);
      let arr = [];
      this.allactiveTag.forEach(t=>{
        if(t.tag!=tag.tag){
          arr.push(t);
        }
      });
      this.allactiveTag=arr;
      console.log("arr",arr);
      //console.log('selectedTagItems',this.selectedTagItems);
      
      this.browseService.createInactiveTag({tag:tag.tag}).then(result=>{
        this.toastr.success("Tags deactivated successfully!"); 
       this.ngOnInit();
       }).catch(err=>{
         console.log(err);
       });

    }

    doTagActive(tag:any){
      console.log("tag",tag);
      let arr = [];
      this.allInactiveTag.forEach(t=>{
        if(t.tag!=tag.tag){
          arr.push(t);
        }
      });
      this.allInactiveTag=arr;
      console.log("arr",arr);
      //console.log('selectedTagItems',this.selectedTagItems);
      
      this.browseService.doTagActive({tag:tag.tag}).then(result=>{
        this.toastr.success("Tags activated successfully!"); 
       this.ngOnInit();
       }).catch(err=>{
         console.log(err);
       });

    }
    
    activeTagFromList(){
      console.log(this.inActiveTags);
      let tagss=[];
      let arr = [];
      this.inActiveTags.forEach(tg=>{
        tagss.push(tg.tag);
        this.allInactiveTag.forEach(t=>{
          if(t.tag!=tg.tag){
            arr.push(t);
          }
        });
        this.allInactiveTag=arr;
      })
      
      
      
      console.log(this.inactveTagItems);
      console.log(arr);
      this.browseService.createActiveTag({tags:tagss}).then(result=>{
        this.toastr.success("Tags activated successfully!"); 
       
       }).catch(err=>{
         console.log(err);
       });
       // @ts-ignore
       this.window.location.reload();
      
      }
   
  }

  


