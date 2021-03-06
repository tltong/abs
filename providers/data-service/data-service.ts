import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import firebase from 'firebase';
import 'firebase/firestore';
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

  private dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }


/* WIP *****
  findArray(inArray:Array<any>,property:string,value:string):any {
   
    for (let i=0;i<inArray.length;i++){
      if (inArray[i].==
    }
  }
*/

  sortArray(inArray:Array<any>,property:string):Array<any> {
    return inArray.sort(this.dynamicSort(property));
  }

  sortArrayReverse(inArray:Array<any>,property:string):Array<any> {
    return inArray.sort(this.dynamicSort(property)).reverse();
  }

  
  randomiseArray(inArray:Array<any>):Array<any> {

    if (inArray.length <= 1) return inArray;

    var currentIndex = inArray.length, temporaryValue, randomIndex ;

    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = inArray[currentIndex];
    inArray[currentIndex] = inArray[randomIndex];
    inArray[randomIndex] = temporaryValue;
    } 



   return inArray;
    
  }


  updateDataBatchFBFS(collectionName:string,items:Array<any>){
    var i:number;
    var sfRef;
    var db = firebase.firestore();    
    var batch = db.batch();
    for (i=0;i<items.length;i++){
      sfRef = db.collection(collectionName).doc(items[i].docID);
      batch.update(sfRef,items[i].getData());      
    }
    batch.commit().then();
  }




pushDataFBFS(collectionName:string,item:any) {
  var db = firebase.firestore();
  db.collection(collectionName).add(item.getData()).then( (docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch( (error) => {
        console.error("Error adding document: ", error);
      });
}



pushDataFSPromise(collectionName:string,item:any) {

  var promise = new Promise((resolve, reject) => {

  var itemsCollection: AngularFirestoreCollection<any>;
  itemsCollection = this.afs.collection<any>(collectionName);
  itemsCollection.add(item.getData()).then(function(docRef) {
    resolve(docRef.id);
  })
  .catch(function(error) {
    reject(error);
  });
 
  });

 return promise;

}


pushDataFS(collectionName:string,item:any) {
    var itemsCollection: AngularFirestoreCollection<any>;
    itemsCollection = this.afs.collection<any>(collectionName);
    itemsCollection.add(item.getData()).then(); 
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

    var itemsCollection: AngularFirestoreCollection<any>;
    var items: Observable<any[]>;

    itemsCollection = this.afs.collection<any>(collectionName);

    items = itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    return items;
  }
/*
  updateAllDocuments(collectionName:string,memberArray:Array ) {
 
    var itemsCollection: AngularFirestoreCollection<any>;
    var members:Observable<any[]>;
    var id:string;
    var i:number;

    itemsCollection = this.afs.collection<any>(collectionName);
    members = this.pullDataSnapshotChangesFS(collectionName);
    
    members.subscribe(queriedItems => {

      for (i=0;i<queriedItems.length;i++) {
        id = queriedItems[0].id;
        itemsCollection.doc(id).delete();
      }
    });
    for (i=0;i<memberArray.length;i++){
       this.pushDataFS(collectionName,memberArray[i]);
      }
  }
*/





  deleteDocument(collectionName:string, docID:string) {
    this.itemsCollection = this.afs.collection<any>(collectionName);
    this.itemsCollection.doc(docID).delete();    
  }

  updateDocument(collectionName:string, docID:string,item:any) {

    var itemsCollection: AngularFirestoreCollection<any>;

    itemsCollection = this.afs.collection<any>(collectionName);
    itemsCollection.doc(docID).update(item.getData());
  }

  updateDocumentPromise(collectionName:string, docID:string,item:any) {

    var promise = new Promise((resolve, reject) => {

      var itemsCollection: AngularFirestoreCollection<any>;
      itemsCollection = this.afs.collection<any>(collectionName);
      itemsCollection.doc(docID).update(item.getData()).then(function() {
      resolve();
       })
      .catch(function(error) {
       reject(error);
  });
 
  });

   return promise;

    

  }



}
