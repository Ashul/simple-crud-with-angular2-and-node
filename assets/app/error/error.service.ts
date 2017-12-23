import { Error } from './error.model';
import { EventEmitter } from '@angular/core';

export class ErrorService{
    errorOccured = new EventEmitter<Error>();

    handleError(error:any){
        const errorData = new Error(error.title, error.error.message);
        this.errorOccured.emit(errorData)
    }
}