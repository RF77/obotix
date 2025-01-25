import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'solver', pathMatch: 'full' },
  { path: 'solver', loadComponent: () => import('./components/formula-editor-create-new/formula-editor-create-new.component').then(m => m.FormulaEditorCreateNewComponent) },
  { path: 'solver/:gcTitle', loadComponent: () => import('./components/formula-editor/formula-editor.component').then(m => m.FormulaEditorComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
