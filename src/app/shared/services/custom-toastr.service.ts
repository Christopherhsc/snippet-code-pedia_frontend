import { Injectable } from '@angular/core';
import { ToastrService as NgxToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {
  private defaultOptions: Partial<IndividualConfig> = {
    progressBar: true,
    positionClass: 'toast-top-center',
    closeButton: true,
    timeOut: 30000
  };

  constructor(private ngxToastr: NgxToastrService) {}

  public success(message: string, title?: string, options?: Partial<IndividualConfig>) {
    this.ngxToastr.success(message, title, {...this.defaultOptions, ...options});
  }

  public error(message: string, title?: string, options?: Partial<IndividualConfig>) {
    this.ngxToastr.error(message, title, {...this.defaultOptions, ...options});
  }
}
