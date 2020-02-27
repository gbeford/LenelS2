import { Injectable } from '@angular/core';
import { IAccessLevel } from './access-level';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IReaders } from './readers';
import { IReaderType } from './reader-type';

@Injectable({
  providedIn: 'root'
})
export class AccessLevelService {
  accessLevel: IAccessLevel[];
  accessData = new BehaviorSubject<IAccessLevel[]>([]);

  constructor(private http: HttpClient) {
    this.getAccessData();
  }

  // get access level
  getAccessLevel(): Observable<IAccessLevel[]> {
    return this.http.get<IAccessLevel[]>('./assets/json/accessLevels.json')
      .pipe(
        tap(r =>
          //  console.log('access level results', r)),
          catchError((e: any) => {
            console.log('error', e);
            return throwError(e);
          })// ...errors if any
        ));
  }

  getReaders(): Observable<IReaders[]> {
    return this.http.get<IReaders[]>('./assets/json/readers.json')
      .pipe(
          catchError((e: any) => {
            console.log('error', e);
            return throwError(e);
          })// ...errors if any
        );
  }

  getReaderType(): Observable<IReaderType[]> {
    return this.http.get<IReaderType[]>('./assets/json/readerTypes.json')
      .pipe(
        catchError((e: any) => {
          console.log('error', e);
          return throwError(e);
        })// ...errors if any
      );
  }

  getAccessData() {
    this.getAccessLevel().subscribe(accessLevel => {
      this.accessLevel = accessLevel;
      this.getReaders().subscribe(reader => {

        this.accessLevel.forEach(element => {
          const item = reader.find(ev => ev.id === element.readerId);
          element.readers = item.name;

          this.getReaderType().subscribe(readerType => {
            const typeItem = readerType.find(f => f.id === item.typeId);
            element.readerType = typeItem.name;
            this.accessData.next(this.accessLevel);
          });
        });
      });
      console.log('access data', this.accessLevel);
    });
  }


}
