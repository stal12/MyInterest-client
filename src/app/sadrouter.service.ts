import {Subject} from "rxjs/Subject";

export class SadrouterService {
  path = new Subject<string>();

  navigate(path: string) {
    this.path.next(path);
  }
}
