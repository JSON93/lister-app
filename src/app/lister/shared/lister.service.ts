import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: "root"
})
export class ListerService {
  lister: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) {}

  getToDoList() {
    this.lister = this.firebasedb.list("titles");
    return this.lister;
  }

  addTitle(title: string) {
    this.lister.push({ title: title, isChecked: false });
  }

  updateListItem($key: string, flag: boolean) {
    this.lister.update($key, { isChecked: flag });
  }

  removeTitle($key: string) {
    this.lister.remove($key);
  }
}
