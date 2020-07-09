import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AppComponent} from '../app.component';
import { GlobalService } from '../global-file/global';
import { TodoService } from '../todo.service';

export interface DialogData {
  id: number;
  title: string;
  email: string;
  name: string;
  status: string;
}
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public globalservice:GlobalService, public todoService: TodoService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  update(){
    this.todoService.updateTodoById(this.data).subscribe(
            data1 => {
                      this.todoService.getAllTodos().subscribe(
                          todoData => {
                              this.globalservice.dataSource = todoData;
                          },
                          error => {
                              console.log(error);
                      });     
            },
            error => {
                console.log(error);
            }
        );
        this.dialogRef.close();
  }
}
