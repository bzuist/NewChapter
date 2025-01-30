import { Fanfic } from '../../models/fanfics';
import { Component, OnInit } from '@angular/core';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { DialogEditWrapperComponent } from './dialog-edit-wrapper/dialog-edit-wrapper.component';

@Component({
  selector: 'app-fanfic-editor',
  templateUrl: './fanfic-editor.component.html',
  styleUrls: ['./fanfic-editor.component.css']
})
export class FanficEditorComponent implements OnInit {

  editingFanfic: Fanfic;
  constructor(private baseService: BaseServiceService) { }

  ngOnInit() {
    this.editingFanfic = new Fanfic();
  }
  addFanfic() {
    this.baseService.addNewFanfic(this.editingFanfic);
    this.editingFanfic = new Fanfic();
  }
}
