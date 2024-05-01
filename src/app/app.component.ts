import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { GeminiService } from './gemini.service';

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
  geminiService: GeminiService=inject(GeminiService);
  ngOnInit():void{
    this.authService.user$.subscribe((user)=>{
      if(user){
        this.authService.currentUserSign.set({
          emil:user.email!,
          username:user.displayName!,
        });
      }else{
        this.authService.currentUserSign.set(null);
      }
      console.log(this.authService.currentUserSign())
    })
  }
  logout(): void {
    this.authService.logout();
  }
  loading: boolean=false;
  chatHistory: any[]=[];
  constructor(){
    this.geminiService.getMassageHistory().subscribe((res)=>{
      if(res){
        this.chatHistory.push(res);
      }
    });
    // console.log(this.chatHistory);
  }
 
  async sendData(){
    if(this.prompt && !this.loading){
      this.loading=true;
      const data=this.prompt;
      this.prompt="";
      await this.geminiService.generateText(data);
       this.loading=false;
    }
  }

  formatText(text:string){
    const result=text.replaceAll('*','');
    return result;
  }
}
