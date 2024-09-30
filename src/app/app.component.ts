import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Purchase';
  public purchaseOrderForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInit();
    this.purchaseOrderForm.get('quantity')!.valueChanges.subscribe(() => {
      this.calculateAmount();
    });
    this.purchaseOrderForm.get('unitRate')!.valueChanges.subscribe(() => {
      this.calculateAmount();
    });
    this.purchaseOrderForm.get('vatRate')!.valueChanges.subscribe(() => {
      this.calculateAmount();
    });
    this.purchaseOrderForm.get('discountRate')!.valueChanges.subscribe(() => {
      this.calculateAmount();
    });
  }

  formInit() {
    this.purchaseOrderForm = this.fb.group({
      quantity: ['', Validators.required],
      unitRate: ['', Validators.required],
      discountRate: ['', Validators.required],
      vatRate: ['', Validators.required],
      netRate: [''],
      totalAmount: [''],
    });
  }

  calculateAmount(): void {
    const quantity = this.purchaseOrderForm.get('quantity')!.value;
    const unitRate = this.purchaseOrderForm.get('unitRate')!.value;
    const discountRate = this.purchaseOrderForm.get('discountRate')!.value;
    const vatRate = this.purchaseOrderForm.get('vatRate')!.value;
    const netDiscount = unitRate * (discountRate / 100);
    const WithDiscount = unitRate - netDiscount;
    const totalAmount = quantity * (vatRate / 100 * WithDiscount) + WithDiscount;
    this.purchaseOrderForm.get('netRate')!.setValue(WithDiscount);
    this.purchaseOrderForm.get('totalAmount')!.setValue(totalAmount);
  }
}
