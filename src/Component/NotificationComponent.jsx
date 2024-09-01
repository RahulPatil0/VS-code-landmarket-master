// import React, { useEffect } from 'react';

// const NotificationComponent = () => {
//   useEffect(() => {
//     // Request notification permission on component mount
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   const showNotification = () => {
//     // Check if notification permission is granted
//     if (Notification.permission === "granted") {
//       // Safely create and show the notification
//       try {
//         new Notification("New Message", {
//           body: "You have received a new message.",
//           icon: "/path/to/icon.png" // Add your icon path here
//         });
//       } catch (error) {
//         console.error("Notification creation failed:", error);
//       }
//     } else {
//       console.log("Notification permission denied");
//     }
//   };

//   return (
//     <div>
//       <h1>Notification Example</h1>
//       <button onClick={showNotification}>Show Notification</button>
//     </div>
//   );
// };

// export default NotificationComponent;
