import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitOnly]'
})
export class DigitOnlyDirective {
  // private navigationKeys =[
  //   'Backspace',
  //   'Delete',
  //   'Tab',
  //   'Escape',
  //   'Enter',
  //   'Home',
  //   'End',
  //   'ArrowLeft',
  //   'ArrowRight',
  //   'Clear',
  //   'Copy',
  //   'Paste'
  // ];
  
  // inputElement: HTMLElement;
  // constructor(public el: ElementRef) { 
  //   this.inputElement = el.nativeElement;
  // }

  // @HostListener("keydown",["$event"])
  // onKeyDown(e: KeyboardEvent) {
  //   if (
  //     this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
  //     (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
  //     (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
  //     (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
  //     (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
  //     (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
  //     (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
  //     (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
  //     (e.key === 'x' && e.metaKey === true) // Allow: Cmd+X (Mac)
  //   ) {
  //     // let it happen, don't do anything
  //     return;
  //   }
  //   // Ensure that it is a number and stop the keypress
  //   if (
  //     (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
  //     (e.keyCode < 96 || e.keyCode > 105)
  //   ) {
  //     e.preventDefault();
  //   }
  // }

  private regex : RegExp = new RegExp('^[0-9]*$');
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home' ];

  constructor(private elementref: ElementRef){}

    @HostListener('keydown',['$event'])
    onKeyDown(event: KeyboardEvent){

      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
    }
      const current: string = this.elementref.nativeElement.value;

      const inputValue: string = this.elementref.nativeElement.value.concat(event.key);

      if(inputValue && !String(inputValue).match(this.regex)){
        event.preventDefault();
      }
      return;
    }

}

