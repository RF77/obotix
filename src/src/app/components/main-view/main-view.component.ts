import { Component } from '@angular/core';
import { FormulaEditorComponent } from '../formula-editor/formula-editor.component';

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrl: './main-view.component.sass',
    imports: [FormulaEditorComponent]
})
export class MainViewComponent {

}
