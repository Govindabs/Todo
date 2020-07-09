import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {EditDialogComponent} from "./edit-dialog/edit-dialog.component"
import { GlobalService } from './global-file/global';
import { TodoService } from './todo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'task-management-app';
  
  taskTypes = ['scheduled','rescheduled','completed'];

  displayedColumns: string[] = ['id', 'title', 'name', 'mail','type','action'];

  constructor(public dialog: MatDialog, public globalservice:GlobalService, private todoService: TodoService){
     this.loadAllTodoList();
  }

  loadAllTodoList() {
        this.todoService.getAllTodos().subscribe(
            data => {
                this.globalservice.dataSource = data;
            },
            error => {
                console.log(error);
            }
        );
    }
  
  createTask(taskform){
    if(taskform.valid){
      var data ={
        title:taskform.value.title,
        name:taskform.value.name,
        email:taskform.value.mail,
        status:taskform.value.tasktype
      };
      this.todoService.createTodo(data).subscribe(
            data => {
                this.loadAllTodoList();
            },
            error => {
                console.log(error);
            }
        );
        taskform.reset();
    }
  }

  updateTask(taskData){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: {
        id:taskData.id,
        title:taskData.title,
        name:taskData.name,
        email:taskData.email,
        status:taskData.status
      }
    });
    
  }

  notifyTask(id){
    this.todoService.notifyTodoDetail(id).subscribe(
            data => {
                console.log("Email has sent");
            },
            error => {
                console.log(error);
            }
        );
  }

  deleteTask(id){
    this.todoService.deleteTodoDetail(id).subscribe(
            data => {
                this.loadAllTodoList(); 
            },
            error => {
                console.log(error);
            }
        );
  }
}
