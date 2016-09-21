import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

import { Parties } from '../../../both/collections/parties.collection';

// import { MeteorComponent } from 'angular2-meteor';
// import { InjectUser } from 'angular2-meteor-accounts-ui';

import template from './parties-form.component.html';

@Component({
  selector: 'parties-form',
  template,
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class PartiesFormComponent implements OnInit {
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [],
      location: ['', Validators.required],
      public: [false]
    });
  }

  resetForm(){
    this.addForm.controls['name']['updateValue']('');
    this.addForm.controls['description']['updateValue']('');
    this.addForm.controls['location']['updateValue']('');
    this.addForm.controls['public']['updateValue'](false);
  }

  addParty(){
    if(this.addForm.valid){
      if(Meteor.userId()){
        Parties.insert(Object.assign({}, this.addForm.value, { owner: Meteor.userId() }));

        this.resetForm(); 
      } else {
        alert('Please Log in to perform this action.')
      }
    }
  }
}