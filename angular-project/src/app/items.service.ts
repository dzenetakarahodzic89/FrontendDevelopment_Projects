import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:4000/api';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getTodoItems() {
    return this.http.get(BASE_URL + '/todos');
  };

  getTodoItem(id: any) {
    return this.http.get(BASE_URL + `/todos/${id}`);
  };

  createTodoItem(item: any) {
    return this.http.post(BASE_URL + '/todos', item, {
      headers: { "content-type": "application/json" }
    });
  };

  updateTodoItem(id: any) {
    return this.http.patch(BASE_URL + `/todos/${id}`,{});
  };

  deleteTodoItem(id: any) {
    return this.http.delete(BASE_URL + `/todos/${id}`);
  };

}
