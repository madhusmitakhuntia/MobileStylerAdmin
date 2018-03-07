import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {

  }

  // get current user data from firebase
  getUserData() {
      return this.afAuth.auth.currentUser;
  }

  login(email, password) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
      return this.afAuth.auth.signOut();
  }

  register(email, password) {
      return Observable.create(observer => {
          this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((authData: any) => {
              // set up initial data
              localStorage.setItem('uid', authData.uid);
              this.updateUserProfile(authData);
              observer.next();
          }).catch((error: any) => {
              if (error) {
                  observer.error(error);
              }
          });
      });
  }

  // update user display name and photo
  updateUserProfile(user) {
      let name = user.name ? user.name : user.email;
      let photoUrl = user.photoURL;

      this.getUserData().updateProfile({
          displayName: name,
          photoURL: photoUrl
      });

      // create or update passenger
      this.db.object('partners/' + user.uid).update({
          name: name,
          photoURL: photoUrl,
          email: user.email,
      })
  }

  resetPassword(email: string) {
      return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signoutUser() {
      return this.afAuth.auth.signOut();
  }

}
