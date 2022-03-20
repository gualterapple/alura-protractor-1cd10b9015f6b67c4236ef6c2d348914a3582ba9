import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ap-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {

  phone = '';
  text = '';

  constructor() { }

  ngOnInit() {
  }

}
