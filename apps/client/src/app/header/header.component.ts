import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navLinks = [ 'All', 'Drama', 'Sci-fi', 'Comedy', 'Horror', 'Family' ];
  activeTabIndex: number = 0;
  currentPage = 1;
  @Output() linkNameChanged = new EventEmitter<string>();

 
  constructor() { }

  ngOnInit(): void {}
  
  onSelect(index: number, link: string) {
    this.activeTabIndex = index; 
    this.linkNameChanged.emit(link);
  }

}
