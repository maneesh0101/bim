import { Routes, RouterModule, RouterOutlet } from '@angular/router';
import { AuthGuard } from './guards/index';
import { HeaderComponent, AuthHeaderComponent, FooterComponent } from './layout/index';
import { Step1Component, Step2Component, Step3Component, Step3CcvComponent, SignInComponent } from './login/index';
import { HomepageComponent } from './homepage/index';
import { DashboardComponent } from './dashboard/index';
import { MyServicesComponent } from './myServices/index';
import { MyAutomationComponent } from './my-automation/index';
import { BuildMySolutionComponent, BillMaterialComponent, BmsPlaceOrderComponent, BmsTrackOrderComponent } from './solution/index';

const appRoutes: Routes = [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    {
        path: 'step-01', children: [
            { path: '', component: Step1Component },
            { path: ':id', component: Step1Component },
            { path: '', component: HeaderComponent, outlet: 'header' },
        ]
    },
    {
        path: 'step-02', children: [
            { path: '', component: Step2Component },
            { path: '', component: HeaderComponent, outlet: 'header' },
        ]
    },
    {
        path: 'step-03', children: [
            { path: '', component: Step3Component },
            { path: '', component: HeaderComponent, outlet: 'header' },
        ]
    },
    {
        path: 'step-03-ccv', children: [
            { path: '', component: Step3CcvComponent },
            { path: '', component: HeaderComponent, outlet: 'header' },
        ]
    },
    {
        path: 'sign-in', children: [
            { path: '', component: SignInComponent },
            { path: '', component: HeaderComponent, outlet: 'header' },
        ]
    },
    {
        path: 'homepage', children: [
            { path: '', component: HomepageComponent, canActivate: [AuthGuard] },
            { path: '', component: AuthHeaderComponent, outlet: 'header' }
        ]
    },
    {
        path: 'dashboard', children: [
            { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: '', component: AuthHeaderComponent, outlet: 'header' }
        ]
    },
    {
        path: 'my-services', children: [
            { path: '', component: MyServicesComponent, canActivate: [AuthGuard] },
            { path: '', component: AuthHeaderComponent, outlet: 'header' }
        ]
    },
    {
        path: 'my-automation', children: [
            { path: '', component: MyAutomationComponent, canActivate: [AuthGuard] },
            { path: '', component: AuthHeaderComponent, outlet: 'header' }
        ]
    },
    {
        path: 'build-my-solution', children: [
            { path: '', component: BuildMySolutionComponent, canActivate: [AuthGuard] },
            { path: 'bill-of-material', component: BillMaterialComponent, canActivate: [AuthGuard] },
            { path: 'place-order', component: BmsPlaceOrderComponent, canActivate: [AuthGuard] },
            { path: 'track-order', component: BmsTrackOrderComponent, canActivate: [AuthGuard] },
            { path: '', component: AuthHeaderComponent, outlet: 'header' }
        ]
    },
    
    // otherwise redirect to home
    //{ path: '**', redirectTo: 'homepage' }    
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
