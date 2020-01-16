import { Component } from '@angular/core';
import { MainService } from './shared/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peliculas';

  constructor ( private mainService: MainService ) { }

  onGenerate() {
    this.mainService.getGenerate().subscribe(
      (data: any) => {
        console.log(data);
      }
    );
  }
}
