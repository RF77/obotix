import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-formula-editor-create-new',
  templateUrl: './formula-editor-create-new.component.html',
  styleUrl: './formula-editor-create-new.component.sass'
})
export class FormulaEditorCreateNewComponent {
  title = "";

  constructor(private router: Router) {

  }

  createSolver() {
    this.router.navigate(['solver', this.title]);
  }
}
