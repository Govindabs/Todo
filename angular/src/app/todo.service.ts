import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseurl = "http://127.0.0.1:8000/todo";
    httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

    constructor(private http:HttpClient) { }
  
    getAllTodos() {
        return this.http.get(this.baseurl+'/tasks/',{headers:this.httpHeaders});
    }
    
    getTodoById(id) {
        return this.http.get(this.baseurl+'/tasks/'+id+'/',{headers:this.httpHeaders});
    }

    createTodo(todo){
        return this.http.post(this.baseurl+'/tasks/', todo, {headers:this.httpHeaders});
    }
  
    updateTodoById(todo) {
        return this.http.patch(this.baseurl+'/tasks/'+todo.id+'/', todo, {headers:this.httpHeaders});
    }

    notifyTodoDetail(id) {
        return this.http.post(this.baseurl+'/notify/', {id:id}, {headers:this.httpHeaders});
    }
    
    deleteTodoDetail(id) {
        return this.http.delete(this.baseurl+'/tasks/'+id+'/', {headers:this.httpHeaders});
    };    
}
