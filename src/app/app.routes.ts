import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Routes = [
    {
        path:'', component:ProductComponent
    },
    {
        path:'addproduct', component:AddProductComponent
    },
    {
        path: 'edit', component: EditProductComponent 
    },
];
