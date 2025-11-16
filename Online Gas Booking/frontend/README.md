**Gas Agency System**

This project allows users to book cylinders and the admin to approve or cancel the user books and it contains customers module, booking module, notice module and settings module.

**Features**

This application supports two types of users:
1.Admin
-Has access to manage customers, bookings, notices, and application settings.
-Can approve or reject booking requests.
-Can add important notices for users.

2.User (Client)
-Can add and manage their own cylinder bookings.
-Can view booking history and active notices posted by the admin.

The app is mobile-responsive and is user-friendly.

**Technologies Used**

-HTML5, CSS3, JavaScript, Reactjs
-Nodejs for backend
-Firebase for data storage
-react-toastify for notifications

**Setup Instructions**

Clone the repository
Run 'cd frontend' and then 'npm install' in terminal.
Then, run 'cd..', 'cd backend' and then 'npm install' in terminal.
Then, run 'npm run both' in vscode terminal to start the app and open the "Available on" links mentioned in terminal after you run the command, 
eg:- (http://localhost:3000)

**How to use the project**
-The application first displays the login page and if the user is new then he/she can register using register page.
-Once registered the user can login.

Admin credentials:
email - mainmail.notify@gmail.com
password - mainmail.notify

The admin contains:
1. Manage Customers
 -All the registered/added customers are displayed here.
 -Admin can edit the customer details or delete the customer.
 -Customer details contain - name, email, total barrels assigned (12 for a year),
  start date (date when user was added), end date (that's the end date for the total assigned barrels).
 -If Admin deletes a user, then all the linked bookings are also deleted from the firebase.
 -Admin can also search customers based on name and email.

2. Add Customer
 -Admin can add new customer
 -The form contains name, email, password.
 -Once the user is added, 12 total barrels will be assigned to the user.
 -Then, user can login and add bookings.

3. Manage Bookings
 -All the user bookings are displayed here.
 -Admin can approve or cancel the bookings.
 -Booking details contain - name, email, address, mobile number, Number of cylinders booked by user, 
    status (Pending, Approved, Cancelled), booking date.
 -Admin can also search bookings based on name and status.
 -When admin approves or cancels the booking, the user receives a mail from the admin email - mainmail.notify@gmail.com.

4. Settings
 -It contains email settings - admin name, email, subject
    Cylinder settings - maximum number of cylinders that a user can book during each booking.
 -Admin can change/update - name, subject and max cylinder number.
 -Admin email cannot be changed.

5. Add Notice
 -Admin can add notice for users.
 -The form contains - title, message, message severity (Critical, Warning, General), duration (when duration 
   expires the notice will not be displayed to the user).

6. Notice Board
 -All valid notices are displayed here.
 -Admin can edit and delete notices.

The user contains:
1. Booking History
 -It displays all the booking history of the user.
 -The booking details contain - name, email, address, mobile number, no. of cylinders booked, status, date of booking.
 -If the admin, cancels or approves the booking, the status here changes accordingly.
 -When booking is placed, for about 3 days user can edit/delete the booking details if the booking status is pending.
 -User can also search the bookings based on no. of cylinders and status.

2. Add booking
 -User can add booking.
 -The form contains name, email, address, mobile number, number of cylinders.
 -When booking is placed, the number of booked cylinders is deducted from the total barrels count (12).
 -If the booking is cancelled by admin, then the number of cylinders booked are added back to the total barrels.
 -If the booking is deleted by the user, then the number of cylinders booked are added back to the total barrels.

3. Notice Board
 -It displays all the valid notices here that are added by admin.

-The user or the admin can then logout.

Resize the screen to check the responsiveness of the application.
