import { Component, OnInit } from '@angular/core';
import { BookItem } from '../../../models/bookItem/bookItem';
import { FavoritesListService } from '../../../services/favoritesListService/favorites-list.service';

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
