import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-hello-component',
  templateUrl: './hello-component.component.html',
  styleUrls: ['./hello-component.component.scss']
})
export class HelloComponentComponent implements OnInit {
  @Input() message: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
