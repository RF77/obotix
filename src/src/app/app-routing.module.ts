import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulaEditorComponent } from './components/formula-editor/formula-editor.component';
import { FormulaEditorCreateNewComponent } from './components/formula-editor-create-new/formula-editor-create-new.component';

const routes: Routes = [
  { path: '', redirectTo: 'solver', pathMatch: 'full' },
  { path: 'solver', component: FormulaEditorCreateNewComponent },
  { path: 'solver/:gcTitle', component: FormulaEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
