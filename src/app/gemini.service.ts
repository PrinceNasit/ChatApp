import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../environment/environment';

// Access API_KEY
const apiKey = environment.API_KEY;
@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private gene:GoogleGenerativeAI;

  private massageHistory: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() {
    this.gene=new GoogleGenerativeAI(apiKey);
   }
   formatText(text:string){
    const result=text.replaceAll('*','');
    return result;
  }
  async generateText(promt:string){
       const model = this.gene.getGenerativeModel({model:'gemini-pro'});
       this.massageHistory.next(
        {
          from:'user',
          massage: promt
        }
       );
       const re = await model.generateContent(promt);

       const response = await re.response;
       const text=response.text();
       console.log(text);
       this.massageHistory.next(
        {
          from:'bot',
          massage: this.formatText(text)
        }
       );
      }
       public getMassageHistory(): Observable<any>{
        return this.massageHistory.asObservable();
       }
   
}
