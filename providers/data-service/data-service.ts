import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';

import { AngularFireModule } from 'angularfire2';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable()
export class DataServiceProvider {

  private itemsCollection: AngularFirestoreCollection<any>;
  private items: Observable<any[]>;

  constructor(private afs: AngularFirestore,public ps:PhoneServiceProvider) {
  }

pushDataFS(collectionName:string,item:any) {
    
    this.itemsCollection = this.afs.collection<any>(collectionName);
    //this.itemsCollection.add({ singer: "the corr", name: "runaway" });
    this.itemsCollection.add(item.getData()); 
  }

  pullDataFS(collectionName:string):Observable<any[]> {
    this.itemsCollection = this.afs.collection<any>(collectionName);
    this.items = this.itemsCollection.valueChanges();
    return this.items;
  }


  pullDataFSSimpleQuery(collectionName:string,fieldName:string,valueName:string):Observable<any[]> {
    this.itemsCollection = this.afs.collection<any>(collectionName, ref => ref.where(fieldName,'==',valueName));
    this.items = this.itemsCollection.valueChanges();
    return this.items;
  }

  pullDataFSCompoundQuery(collectionName:string,fieldName1:string,valueName1:string,fieldName2:string,valueName2:string):Observable<any[]> {
    this.itemsCollection = this.afs.collection<any>(collectionName, ref => ref.where(fieldName1,'==',valueName1).where(fieldName2,'==',valueName2));
    this.items = this.itemsCollection.valueChanges();
    return this.items;
  }


  pullDataSnapshotChangesFSSimpleQuery(collectionName:string,fieldName:string,valueName:string):Observable<any[]> {
    this.itemsCollection = this.afs.collection<any>(collectionName, ref => ref.where(fieldName,'==',valueName));

    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    return this.items;
  }
 
  pullDataSnapshotChangesFS(collectionName:string):Observable<any[]> {
    this.itemsCollection = this.afs.collection<any>(collectionName);

    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    return this.items;
  }


}
