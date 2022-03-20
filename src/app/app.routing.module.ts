import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    }, 
    { 
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    { 
        path: '',
        loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule)
    },              
    { 
        path: 'error', 
        component: GlobalErrorComponent,
        data: {
            title: 'Error'
        }
    },      
    { 
        path: 'not-found', 
        component: NotFoundComponent,
        data: {
            title: 'Not found'
        }
    },      
    { 
        path: '**', 
        redirectTo: 'not-found'
    }  
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' } ) 
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

