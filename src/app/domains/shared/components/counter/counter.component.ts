import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration: number = 0;
  @Input({required: true}) message: string = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor(){
    //Before render, no async
    //Once
    console.log('Constructor');
    console.log('-'.repeat(10)); 
  }

  ngOnChanges(changes: SimpleChanges){
    //Before and during render
    console.log('ngOnChanges');
    console.log(changes);
    console.log('-'.repeat(10));
    const duration = changes['duration'];
    if(duration && duration.currentValue !== duration.previousValue){
      this.doSomething();
    }
    
  }

  ngOnInit(){
    //Before render, async
    //Once
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration => ' + this.duration);
    console.log('message => ' + this.message);
    this.counterRef = window.setInterval(()=>{
      this.counter.update(statePrev => statePrev + 1)
    }, 1000)
  }

  ngAfterViewInit(){
    //After render
    //Hijos ya fueron renderizados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy(){
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomething(){
    console.log('Change duration');  
  }
}
