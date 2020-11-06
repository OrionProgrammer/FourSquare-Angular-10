import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { LandmarksRoutingModule } from './landmarks-routing.module';
import { ListComponent } from './list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LandmarksRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent
    ]
})
export class LandmarksModule { }