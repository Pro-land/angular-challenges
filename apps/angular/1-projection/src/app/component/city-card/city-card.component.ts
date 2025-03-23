import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemRefDirective } from '../../ui/list-item/list-item-ref.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [type]="cardType"
      [image]="cityImage"
      (addNewItemEvent)="cityAddMethod()"
      customClass="bg-light-green">
      <ng-template listItemRef let-city>
        <app-list-item (deleteItem)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  readonly cityImage = 'assets/img/city.png';
  readonly cardType = CardType.CITY;
  protected cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  cityAddMethod() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
