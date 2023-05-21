import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HexString } from "../types";

type Task = {
  title: string;
  description: string;
  payment: number;
  dueDate: Date;
  author: HexString
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  mockedTasks(): Observable<Task[]> {
    const tasks: Task[] = [
      {
        title: "Review of client specification",
        description: `Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Impedit dolorem consequatur amet
        labore commodi sunt! Dolor ea odit corporis placeat.`,
        payment: 0.2,
        dueDate: new Date(),
        author: '0x00eDbE893E988aBAf2C57624b3ff8187f3ad362C'
      },
      {
        title: "Organize party event",
        description: `Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Impedit dolorem consequatur amet
        labore commodi sunt! Dolor ea odit corporis placeat.`,
        payment: 0.054,
        dueDate: new Date(),
        author: '0x00eDbE893E988aBAf2C57624b3ff8187f3ad362C'
      },
      {
        title: "Presentation for new line",
        description: `Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Impedit dolorem consequatur amet
        labore commodi sunt! Dolor ea odit corporis placeat.`,
        payment: 2.5,
        dueDate: new Date(),
        author: '0x00eDbE893E988aBAf2C57624b3ff8187f3ad362C'
      },
      {
        title: "Backup of VM files",
        description: `Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Impedit dolorem consequatur amet
        labore commodi sunt! Dolor ea odit corporis placeat.`,
        payment: 1.35,
        dueDate: new Date(),
        author: '0x00eDbE893E988aBAf2C57624b3ff8187f3ad362C'
      }
    ];

    return of(tasks);
  }
}
