import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { DataService } from './mydata.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  http = inject(HttpClient);
  authService=inject(AuthService);
  prompt: string="";
  type:string="";
  col:string="";
  dataService: DataService=inject(DataService);
  ngOnInit():void{
    this.authService.user$.subscribe((user)=>{
      if(user){
        this.authService.currentUserSign.set({
          email:user.email!,
          username:user.displayName!,
        });
      }else{
        this.authService.currentUserSign.set(null);
      }
     
    })
  }
  logout(): void {
    this.authService.logout();
  }
  loading: boolean=false;
  chatHistory: any[]=[];
  constructor(){
    this.dataService.getMassageHistory().subscribe((res)=>{
      if(res){
        this.chatHistory.push(res);
        console.log(res);
      }
    });
    // console.log(this.chatHistory);
    this.type='';
    this.col="";
  }
 
  async sendData(){
    if(this.prompt && !this.loading){
      this.loading=true;
      const data=this.prompt;
      const words = data.split(" ");
      this.type=words[0].toLowerCase();
      this.col= words.slice(1).join(" ");
      this.prompt="";
      await this.dataService.generateText(data,this.type);
       this.loading=false;
    }
  }
}
