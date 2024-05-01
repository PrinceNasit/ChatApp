import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideFirebaseApp,initializeApp} from '@angular/fire/app'
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {getAuth, provideAuth} from '@angular/fire/auth';
// import { ChatModule } from './chat/chat.module';

const firebaseConfig = {
  apiKey: "AIzaSyApiJd6Rw9qM8bwwKF2MqwjKWFowmLMDEQ",
  authDomain: "friendlychat-e37ee.firebaseapp.com",
  projectId: "friendlychat-e37ee",
  storageBucket: "friendlychat-e37ee.appspot.com",
  messagingSenderId: "716477189465",
  appId: "1:716477189465:web:d9f9634374f64726069048"
};
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(()=>initializeApp(firebaseConfig)),
      provideAuth(()=>getAuth())
    ])
  ],
};
