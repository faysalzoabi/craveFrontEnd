import firebase from 'firebase';

export const initializeFirebase = () => {
    const config = {
        messagingSenderId: "491175858754"
    };
    firebase.initializeApp(config)
    firebase.messaging().onMessage(payload => {
      let notificationTitle = payload.notification.title;
      let notificationOptions = {
        body: payload.notification.body,
        icon:payload.notification.icon
      };
      let notification = new Notification(notificationTitle,notificationOptions);
  });
}


export const askForPermissionToReceiveNotifications = async () => {
    const messaging = firebase.messaging();
    try {
      await messaging.requestPermission();
      const token = await messaging.getToken();
      localStorage.setItem("notification-token", token);
      return token;
    } catch (error) {
      console.error(error);
    }
  }

  