import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import "dhtmlx-gantt";
import { TaskService, LinkService } from "../services/index";
import { } from "@types/dhtmlxgantt";

@Component({
    selector: "gantt",
    styleUrls: ['./gantt.css'],
    providers: [TaskService, LinkService],
    template: "<div #gantt_here style='width: 100%; height: 100%;'></div>",
})
export class GanttComponent implements OnInit {
    @ViewChild("gantt_here") ganttContainer: ElementRef;

    constructor(private taskService: TaskService, private linkService: LinkService) { }
    ganttData: any;

    ngOnInit() {
        gantt.config.xml_date = "%Y-%m-%d";
        gantt.config.show_grid = true;
        //default columns definition
        gantt.config.columns = [
            { name: "solutionType", label: "Solution Type", width: 160, tree: true },
            { name: "text", label: "Reference CFS", width: 150 },
            { name: "duration", label: "Duration", width: 50, align: "center" },
            { name: "start_date", label: "Start Date", width: 80, align: "center" }
        ];

        gantt.templates.leftside_text = function (start, end, task) {
            if(task.progress){
                var text = "<strong>"+task.progress+"%</strong>";
                return text;
            }
        };

        gantt.init(this.ganttContainer.nativeElement);

        //add css class to gantt bar log
        gantt.templates.task_class = function (start, end, task) {
            if (task.$level == 0) {
                return "family-log";
            }
        };

        gantt.templates.grid_row_class = function (start, end, task) {
            if (task.$level == 0) {
                return "row-family-log";
            }
        }



        //remove drag, add, edit from gantt progress bar. make whole chart readonly
        gantt.config.readonly = true;

        Promise.all([this.taskService.getGanttData(), this.linkService.get()])
            .then(([data, links]) => {
                gantt.parse({ data, links });
                gantt.open("p_1");
            });
    }
}