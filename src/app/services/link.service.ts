import {Injectable} from "@angular/core";
import {Link} from "../models/index";

@Injectable()
export class LinkService {
    get(): Promise<Link[]> {
        return Promise.resolve([
            {id: 1, source: 1, target: 0, type: "0"}
        ]);
    }
}