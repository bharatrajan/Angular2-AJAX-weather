import { bootstrap } from 'angular2/platform/browser';
import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';


@Component({
  selector: 'app'
})
@View({
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ],  
  template: ` 
  <header>
    <h1 class="title">Angular 2 HTTP</h1>
  </header>



  <section>
    <label for="zip">Zip </label>

    <input
          type="text"
          #zip
          id="zip"
          ng-model="zip"
          required (change)="forecast(zip)">

    <button (click)="forecast(zip)">Forecast</button>

    <section>
    <br/>
      <label for="zip">{{location}} </label>
    </section>

    <ul id="issue-list">
        <li *ngFor="#elem of fcList">
          <label>{{elem}}</label>
        </li>
    </ul>



  </section>
  `
})

export class App {
  title: string;
  data: string;
  zip: string;
  result : string;
  location : string;
  fcList: <string> = [];

  constructor(public http: Http) {
    this.forecast("94089");
  }
 
  forecast(zip){

    if(zip.value){
      zip = zip.value;
    }
    this.http.get('http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where location='+  zip  +'&format=json')
      .subscribe(
        data => this.result = JSON.parse(data.text()),
        err => this.logError(err.text()),
        () => { 
              if(!this.result.query.results.channel){

              }else{
                this.fcList = [];
                this.location = this.result.query.results.channel.item.title;
                for(var elem of this.result.query.results.channel.item.forecast) {
                    this.fcList.push( elem.date + ' : '+ elem.text);
                    console.log(elem.date + ' : '+ elem.text);
                }
              }
            }
      );
  }

  logError(err) {
    this.location = err;
    this.fcList = []; 
    console.error('There was an error: ' + err);
  }


}

bootstrap(App, [HTTP_PROVIDERS]);
