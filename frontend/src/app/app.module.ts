import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoxComponent } from './component/box/box.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingComponent } from './component/loading/loading.component';
import { DatetimeComponent } from './component/datetime/datetime.component';
import { TableComponent } from './component/table/table.component';
import { PlotComponent } from './component/plot/plot.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { RadioComponent } from './component/radio/radio.component';
import { EntryPointComponent } from './component/entry-point/entry-point.component';
import { SliderComponent } from './component/slider/slider.component';
import { ButtonToggleComponent } from './component/button-toggle/button-toggle.component';
import { ToggleComponent } from './component/toggle/toggle.component';
import { SimpleFilterComponent } from './component/simple-filter/simple-filter.component';
import { GroupFilterComponent } from './component/group-filter/group-filter.component';
import { SubEntryPointComponent } from './component/sub-entry-point/sub-entry-point.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { InputComponent } from './component/input/input.component';
import { FileSaverModule } from 'ngx-filesaver';
import { AppDownloadComponent } from './component/app-download/app-download.component';
import { AppUploadComponent } from './component/app-upload/app-upload.component';
import { AppImageComponent } from './component/app-image/app-image.component';
import { HighchartComponent } from './component/highchart/highchart.component';
import { ChartModule } from 'angular-highcharts';
import { SimpleServerFilterComponent } from './component/simple-server-filter/simple-server-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    SidebarComponent,
    BoxComponent,
    LoadingComponent,
    DatetimeComponent,
    TableComponent,
    PlotComponent,
    CheckboxComponent,
    RadioComponent,
    EntryPointComponent,
    SliderComponent,
    ButtonToggleComponent,
    ToggleComponent,
    SimpleFilterComponent,
    GroupFilterComponent,
    SubEntryPointComponent,
    InputComponent,
    AppDownloadComponent,
    AppUploadComponent,
    AppImageComponent,
    HighchartComponent,
    SimpleServerFilterComponent,
  ],
  imports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    NgxMatSelectSearchModule,
    FileSaverModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
