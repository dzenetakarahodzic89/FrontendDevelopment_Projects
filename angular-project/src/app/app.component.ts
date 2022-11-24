import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { ItemsService } from './items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private itemsService: ItemsService) { }

  title = 'angular-project';
  items: any = [];
  taskName:string= ''


  ngOnInit(): void {
      this.itemsService.getTodoItems()
        .pipe(take(1))
        .subscribe(items => {
          this.items = items;
        });
  };

  makeDone(id:any):void{
    this.itemsService.updateTodoItem(id).pipe(take(1)).subscribe(data=>this.items=data)
  }
  delete(id:any):void{
    this.itemsService.deleteTodoItem(id).pipe(take(1)).subscribe(data=>this.items=data)
  }

  createItem():void{
    if(this.taskName==''){
      alert("enter task name")
      return
    }
    this.itemsService.createTodoItem({text:this.taskName}).pipe(take(1)).subscribe(data=>this.items=data)

  }

  doneFilter(item: any) {
    return item.done;
  };

  notDoneFilter(item: any) {
    return !item.done;
  };
  onKey(event:any){
    this.taskName=event.target.value

  }

}
