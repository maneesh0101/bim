export class Task {
    id: number;
    solutionType: string;
    text: string;
    duration: number;
    start_date: string;
    actual_start_date: string;
    end_date: string;
    actual_end_date: string;
    status: string;
    progress: number;
    parent: number;
}