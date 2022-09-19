import { Component, OnInit } from '@angular/core';
import { Forecast } from './forecast.model';
import { ForecastService } from './forecast.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  data$: Forecast[] = [];
  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.forecastService.GetAll().subscribe((data) => {
      this.data$ = data;
    });
  }

}
