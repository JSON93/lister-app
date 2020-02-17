import { Component, OnInit } from "@angular/core";
import { ListerService } from "./shared/lister.service";

@Component({
  selector: "app-lister",
  templateUrl: "./lister.component.html",
  styleUrls: ["./lister.component.scss"],
  providers: [ListerService]
})
export class ListerComponent implements OnInit {
  listerArray: any[];
  constructor(private _listerService: ListerService) {}

  ngOnInit(): void {
    this._listerService
      .getToDoList()
      .snapshotChanges()
      .subscribe(item => {
        this.listerArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.listerArray.push(x);
        });

        this.listerArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }

  public onAdd(title) {
    this._listerService.addTitle(title.value);
    title.value = null;
  }

  alterCheck($key: string, isChecked) {
    this._listerService.updateListItem($key, !isChecked);
  }

  onDelete($key: string) {
    this._listerService.removeTitle($key);
  }
}
