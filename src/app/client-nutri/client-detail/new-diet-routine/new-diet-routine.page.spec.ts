import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';

import { NewDietRoutinePage } from './new-diet-routine.page';

describe('NewDietRoutinePage', () => {
  let component: NewDietRoutinePage;
  let fixture: ComponentFixture<NewDietRoutinePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDietRoutinePage ],
      imports: [IonicModule.forRoot(),
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDietRoutinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
