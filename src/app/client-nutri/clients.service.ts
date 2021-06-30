import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { clientItem } from './clientItem.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private clientVector = new BehaviorSubject<clientItem[]>([]);

  constructor(private authService: AuthService,  private firestore: AngularFirestore) { }
  get Clientes(){
    return this.clientVector.asObservable();
  }
  getObservable(collectionFR: string) {
    switch (collectionFR) {
      case 'Cliente':
        return this.Clientes;
      default:
        break;
    }
  }
  concatenar(collectionFR: string, infoArray: any, infoData) {
    switch (collectionFR) {
      case 'Cliente':
        this.clientVector.next(infoArray.concat(infoData));
        break;
      default:
        break;
    }
  }
  add_toFirestore(
    data_to_concat: any,
    data_to_send: any,
    collectionFR: string,
    requiredID: boolean
  ) {
    let fetchedUserId;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('no user id found');
        }

        fetchedUserId = userId;
        if (requiredID) data_to_send.id_nutri = fetchedUserId;
        // console.log("SENDING DATA");
        // console.log(data_to_send);
        return (
          this.firestore
            .collection(collectionFR)
            // .add<{ name: string }>({ ...classInforme, id_informe: null }); // no se puede hacer eso
            .add(data_to_send)
        );
      }),
      switchMap((resData) => {
        data_to_concat.id = resData.id;
        return this.getObservable(collectionFR);
      }),
      take(1),
      tap((info) => {
        this.concatenar(collectionFR, info, data_to_concat);
        // classInforme.id_informe = this.last_id_info;
        // this.ItemsAlimentariosVector.next(info.concat(itemalimentario));
      })
    );
  }
  get_ArrayData(collectionFR: string, datarecieved: any) {
    const answer = [];
    if (datarecieved.length !== 0) {
      switch (collectionFR) {
        case 'Cliente':
          for (let it of datarecieved) {
            answer.push(
              new clientItem(
                it.id,
                it.data.nombres,
                it.data.apellidos,
                it.data.edad,
                it.data.genero,
                it.data.number,
                it.data.correo_electronico,
                it.data.ocupacion,
                it.data.id_nutri
              )
            );
          }
          break;

        default:
          break;
      }
    }
    return answer;
  }
  fetch_firebase(collectionFR: string) {
    let fetchedUserId: string;
    console.log("fetching");
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('User not found');
        }
        fetchedUserId = userId;
        return this.firestore.collection(collectionFR,ref => ref.where('id_nutri', '==',fetchedUserId)).snapshotChanges();
      }),
      map((returnedData) => {
        const datatoSave = [];

        returnedData.forEach((returnedData) => {
          var varinfo = {
            id: returnedData.payload.doc.id,
            data: returnedData.payload.doc.data(),
          };
          datatoSave.push(varinfo);
        });

        return datatoSave;
      }),
      tap((datarecieved) => {
        this.clientVector.next(
          this.get_ArrayData(collectionFR, datarecieved)
        );
      })
    );
  }
  getClient(id_client: string) {
    return this.clientVector.pipe(
      take(1),
      map((client) => {
        return { ...client.find((p) => (p.id_client = id_client)) };
      })
    );

  }
}

