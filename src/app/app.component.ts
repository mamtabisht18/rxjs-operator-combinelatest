import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  myForm: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup({
      quantity: new FormControl(''),
      price: new FormControl(''),
      total: new FormControl({value: '',disabled: true})
    });

    combineLatest(
      this.myForm.get('quantity').valueChanges,this.myForm.get('price').valueChanges
    ).pipe(
      map(([q, p]) => q * p)
    ).subscribe(t => {
      this.myForm.get('total').setValue(t)
    });

    // without combineLatest

    // this.myForm.get('quantity').valueChanges.subscribe(
    //   (value)=>{
    //     this.myForm.get('total').setValue(
    //       value * this.myForm.get('price').value
    //     )
    //   }
    // )

    // this.myForm.get('price').valueChanges.subscribe(
    //   (value)=>{
    //     this.myForm.get('total').setValue(
    //       value * this.myForm.get('quantity').value
    //     )
    //   }
    // )
  }

  onSubmit(){
    console.log(this.myForm)
  }

}
