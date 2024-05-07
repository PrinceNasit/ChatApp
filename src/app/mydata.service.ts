import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

export interface MyApiResponse {
  columns: string[];
  data: any;
  error:string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public http = inject(HttpClient);
  public sanitizer = inject(DomSanitizer);
  
  apiUrl = 'http://127.0.0.1:8080/';
  getData(prompt: string): Observable<MyApiResponse> {
    console.log(prompt);
    const res = this.http.post<MyApiResponse>(this.apiUrl, { query: prompt });
    return res;
  }
  
  private massageHistory: BehaviorSubject<any> = new BehaviorSubject(null);
  
  formatText(text: string) {
    const result = text.replaceAll('*', '');
    return result;
  }
  async generateText(promt: string,type1:string) {
   
    this.massageHistory.next(
      {
        from: 'user',
        massage: promt,
        error:"NaN",
        col:"NaN",
        data:"NaN",
        type:""
      }
    );
 
    this.getData(promt).subscribe((re) => {
      console.log(re.columns);
      console.log(re.data);
      console.log(re.error);
      
      if (re.error === "NaN") {
        this.massageHistory.next({
          from: 'bot',
          message: "",
          error:re.error,
          col:re.columns,
          data: re.data,
          type: type1
        }); 
      } else {
        this.massageHistory.next({
          from: 'bot',
          message: "",
          error:re.error,
          col:re.columns,
          data:re.data,
          type: type1
        });
       
      }
    });
  
  }
  public getMassageHistory(): Observable<any> {
    return this.massageHistory.asObservable();
  }
}
