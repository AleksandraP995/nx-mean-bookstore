import { Component, OnInit } from '@angular/core';
import { FavoritesListService } from '../../../services/favoritesListService/favorites-list.service';
import { BookItem } from '@org-bookstore/app-configuration';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
})
export class FavoritesListComponent implements OnInit {
  favoritesList: BookItem[] = [];

  constructor(private favoritesService: FavoritesListService) {}

  ngOnInit(): void {
    this.favoritesList = this.favoritesService.favoritesList;
  }
}
