import { Component, OnInit } from '@angular/core';
import { Fanfic } from 'src/app/models/fanfics';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-read.component',
  templateUrl: './read.component.component.html',
  styleUrls: ['./read.component.component.css']
})
export class ReadComponentComponent implements OnInit {
  fanfic: Fanfic;
  id: number;
  userId: number;
  constructor(private baseService: BaseServiceService,
    private route:ActivatedRoute,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'))
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
    }
    console.log("ReadComponent");
     this.baseService.getFanficById(this.id).subscribe(data => {this.fanfic = data});
     console.log(this.id)
  }
  // loadData(){



  // }

}
