importScripts('https://www.gstatic.com/firebasejs/5.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.7.2/firebase-messaging.js');


firebase.initializeApp({
    messagingSenderId: "491175858754"
});

const messaging = firebase.messaging();
console.log('messaging', messaging)

messaging.setBackgroundMessageHandler(function (payload) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.icon
    };
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });