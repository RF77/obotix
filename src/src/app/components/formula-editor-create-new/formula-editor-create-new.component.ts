import { Component, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-formula-editor-create-new',
    templateUrl: './formula-editor-create-new.component.html',
    styleUrl: './formula-editor-create-new.component.sass',
    imports: [FormsModule, InputText, Button]
})
export class FormulaEditorCreateNewComponent {
  private router = inject(Router);

  title = "";

  createSolver() {
    this.router.navigate(['solver', this.title]);
  }
}
