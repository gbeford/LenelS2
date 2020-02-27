import { Component, OnInit } from '@angular/core';
import { AccessLevelService } from './access-level.service';
import { IAccessLevel } from './access-level';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IReaders } from './readers';

@Component({
  selector: 'app-access-levels',
  templateUrl: './access-levels.component.html',
  styleUrls: ['./access-levels.component.scss']
})
export class AccessLevelsComponent implements OnInit {

  accessData: IAccessLevel[];
  public myForm: FormGroup;
  readers: IReaders[];
  orignalData: IAccessLevel;
  rowID: number;

  constructor(private accessService: AccessLevelService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.getReaders();
    this.getAccessInfo();
  }


  createForm() {
    this.myForm = this.formBuilder.group({
      spotlight: [''],
      name: [''],
      description: [''],
      reader: ['']
    });
  }

  getAccessInfo() {
    this.accessService.accessData
      .subscribe(s => {
        this.accessData = s;
      });
  }

  getReaders() {
    this.accessService.getReaders().subscribe(r => {
      this.readers = r;
    });
  }

  getRow(accessInfo: IAccessLevel) {
    this.orignalData = accessInfo;
    this.myForm.patchValue({
      name: accessInfo.name,
      description: accessInfo.Description
    });
    this.myForm.controls.reader.patchValue(accessInfo.readerId);
    this.rowID = accessInfo.id;
  }

  save() {
    const updatedData = this.accessData.find(x => x.id === this.rowID);
    updatedData.name = this.myForm.value.name;
    updatedData.Description = this.myForm.value.description;
    updatedData.readerId = this.myForm.value.reader;
    const readerList = this.readers.find(r => r.id.toString() === updatedData.readerId.toString());
    updatedData.readers = readerList.name;
  }

  cancel() {
    this.myForm.patchValue({
      name: this.orignalData.name,
      description: this.orignalData.Description
    });
    this.myForm.controls.reader.patchValue(this.orignalData.readerId);
  }

  filter() {
    this.accessData = this.accessData.filter(
      result => result.name === this.myForm.value.spotlight ||
        result.readerType === this.myForm.value.spotlight ||
        result.readers === this.myForm.value.spotlight);
  }

  reset() {
    this.myForm.reset();
    this.getAccessInfo();
  }

}
