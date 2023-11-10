import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer = new Subject<string>();
  private debouncerSubcription?: Subscription;
  @Output()
  public onValue = new EventEmitter<string>();
  @Output()
  public onDebounce = new EventEmitter<string>();
  @Input()
  public placeholder: string = '';
  @Input()
  public initialValue: string = '';
  ngOnInit(): void {
    this.debouncerSubcription = this.debouncer.pipe(
      debounceTime(400)
    ).subscribe(value => { this.onDebounce.emit(value) });
  }
  ngOnDestroy(): void {
      this.debouncerSubcription?.unsubscribe();
  }
  emitValue(term: string): void {
    this.onValue.emit(term);
  }
  onKeyUp(term: string): void {
    this.debouncer.next(term);
  }
}
