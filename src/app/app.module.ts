import { NgModule, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppComponent } from './app.component';
import { CarouselModule, ButtonsModule, ModalModule, PopoverModule, TooltipModule, TabsModule, ProgressbarModule } from 'ngx-bootstrap';
import { AuthGuard } from './guards/index';

import { AccordionModule } from "ngx-accordion";
import { AccordionConfig } from 'ngx-bootstrap/accordion';
import { NgxPaginationModule } from 'ngx-pagination';

import { Globals } from './app.globals';
import { EqualValidator } from './directives/index';
import { routing } from './app.routing';
import { AlertService, RegistrationService, MyservicesService, BuildMySolutionService, MyConsoleService } from './services/index';
import { HeaderComponent, FooterComponent, NavButtonsComponent, AuthHeaderComponent, LeftMenuComponent, BmsNavButtonsComponent } from './layout/index';
import { Step1Component, Step2Component, Step3Component, Step3CcvComponent, SignInComponent } from './login/index';
import { HomepageComponent } from './homepage/index';
import { DashboardComponent, MyTicketsComponent, AlertsWidgetComponent, NotificationWidgetComponent, UsageChartComponent, SolutionInsightsComponent, MyOrganizationComponent } from './dashboard/index';
import { MyServicesComponent } from './myServices/index';
import { MyAutomationComponent } from './my-automation/index';
import { GanttComponent, BuildMySolutionComponent, BillMaterialComponent, BmsPlaceOrderComponent, BmsTrackOrderComponent, SunburstChartComponent } from './solution/index';
import { AlertComponent, SpecialOffersWidgetComponent, VideoGuidelinesWidgetComponent, BuildSolutionWidgetComponent, ProductsWidgetComponent, MarketPlaceWidgetComponent, AgreeBmsPlaceOrderOverlayComponent, AgreeCreateProfileOverlayComponent, ConsoleIntegrationComponent, BmsPersonalizeMySolutionPopup, PlaceOrderAlertPopup, SvcWidgetComponent } from './widgets/index';
import { KeysPipe } from './keys.pipe';
import { SearchPipe } from './search.pipe';
import { DataFilterPipe } from './datafilter.pipe';
import { DataTableModule } from 'angular2-datatable';
import { InlineEditorModule } from 'ng2-inline-editor';
import { NvD3Module } from 'ngx-nvd3';
import { ChartsModule } from 'ng4-charts/ng4-charts';

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    AccordionModule,
    ButtonsModule.forRoot(),
    DataTableModule,
    InlineEditorModule,
    NvD3Module,
    ChartsModule
  ],
  declarations: [
    AppComponent,
    GanttComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step3CcvComponent,
    SignInComponent,
    HeaderComponent,
    FooterComponent,
    NavButtonsComponent,
    AuthHeaderComponent,
    BmsNavButtonsComponent,
    LeftMenuComponent,
    EqualValidator,
    HomepageComponent,
    DashboardComponent,
    MyTicketsComponent,
    MyServicesComponent,
    BuildMySolutionComponent,
    BillMaterialComponent,
    BmsPlaceOrderComponent,
    BmsTrackOrderComponent,
    SpecialOffersWidgetComponent,
    VideoGuidelinesWidgetComponent,
    BuildSolutionWidgetComponent,
    ProductsWidgetComponent,
    MarketPlaceWidgetComponent,
    AgreeBmsPlaceOrderOverlayComponent,
    AgreeCreateProfileOverlayComponent,
    BmsPersonalizeMySolutionPopup,
    ConsoleIntegrationComponent,
    AlertComponent,
    MyTicketsComponent,
    AlertsWidgetComponent,
    MyOrganizationComponent,
    PlaceOrderAlertPopup,
    NotificationWidgetComponent,
    UsageChartComponent,
    SolutionInsightsComponent,
    SunburstChartComponent,
    MyAutomationComponent,
    KeysPipe,
    SearchPipe,
    DataFilterPipe,
    SvcWidgetComponent
  ],
  providers: [
    AuthGuard,
    { provide: AccordionConfig, useFactory: getAccordionConfig },
    Globals,
    AlertService,
    RegistrationService,
    BuildMySolutionService,
    MyservicesService,
    MyConsoleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
