import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillItemListComponent } from './bill-item-list.component';

describe('BillItemListComponent', () => {
  let component: BillItemListComponent;
  let fixture: ComponentFixture<BillItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillItemListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
