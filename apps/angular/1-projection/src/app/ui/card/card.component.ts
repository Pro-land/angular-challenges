import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemRefDirective } from '../list-item/list-item-ref.directive';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <img [ngSrc]="image() || ''" width="200" height="200" />
      <section>
        <
        @for (item of list(); track item) {
          <ng-template
            [ngTemplateOutlet]="listItemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        }
        >
      </section>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgOptimizedImage, NgTemplateOutlet],
  standalone: true,
})
export class CardComponent<T extends { id: number }> {
  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly image = input<string>();
  readonly customClass = input('');
  readonly nameToShow = input<string>();

  @Output() addNewItemEvent = new EventEmitter<void>();
  @Output() removeItemEvent = new EventEmitter<number>();

  @ContentChild(ListItemRefDirective, { read: TemplateRef })
  listItemTemplate!: TemplateRef<{ $implicit: T }>;

  addNewItem() {
    this.addNewItemEvent.emit();
  }
}
