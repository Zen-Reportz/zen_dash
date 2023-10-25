import { MEData } from './../../shared/application_data';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() url!: string;
  @Input() isSidebar!: boolean;
  @ViewChild('inputModel') inputModel!: NgModel
  data!: string;


  constructor(private ds: DataService) {}

  ngOnInit() {
    let selected = this.ds.all_input.get(this.url)?.input_data?.value;
    if (selected !== undefined) {
      this.data = selected;
    }
  }

  getValue() {
    return this.ds.all_input.get(this.url)?.input_data?.value;
  }

  getLabel() {
    if (this.ds.all_input.get(this.url)?.input_data?.label) {
      return '';
    } else {
      return this.ds.all_input.get(this.url)?.input_data?.label;
    }
  }

  saveData() {
    let m = new MEData();
    m.key = this.ds.all_input.get(this.url)?.input_data?.name as string;
    m.value = this.data;
    m.page = this.ds.dataLookup(this.isSidebar)
    m.url = this.url

    this.ds.data_setter.emit(m);
    // this.ds.all_input.get(this.url)?.input_data?.value = this.data
  }

  clearData() {
    this.data = '';
    let m = new MEData();
    m.key = this.ds.all_input.get(this.url)?.input_data?.name as string;
    m.value = this.data;
    m.page = this.ds.dataLookup(this.isSidebar);
    // this.ds.all_input.get(this.url)?.input_data.value = this.data
    this.ds.data_setter.emit(m);
  }

  onPaste(event: ClipboardEvent, inputElement: HTMLInputElement) {
    event.preventDefault()
    const selectionStart = inputElement.selectionStart
    // console.log(selectionStart)
    const selectionEnd = inputElement.selectionEnd
    // console.log(selectionEnd)


    if (event.clipboardData){
      let pastedText = event.clipboardData.getData("text/plain")
      // console.log(pastedText)
      if ((selectionStart !== null) && (selectionEnd !== null)) {
        const bST = this.data.substring(0, selectionStart)
        const aST = this.data.substring(selectionEnd)
        // console.log("bst")
        // console.log(this.data)
        // console.log(bST)
        // console.log(aST)
        // console.log("ast")
        this.data = bST + pastedText + aST
      } else {
        this.data += pastedText
      }
    }
    this.saveData()
  }
}
