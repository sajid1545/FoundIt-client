# FoundIt - Lost and Found Items Management System

Our lost and found system is designed to be a centralized platform where users can easily report lost items, find items that have been lost and even help others by reporting found items. Our system can categorize and filter out reported items, making it easier for users to search and find what they are looking for. With our system, users can save time and effort, while also helping others in the community. We believe that our system will make a positive impact in the community by reducing the time it takes for items to be found and returned back to their rightful owners.

## Project Details

- In order to get report lost and found items, users need to create an account.
- After registration, users can report lost items, find items that have been lost, and help others by reporting found items.
- After registration is successful, users can login to their account.
- If login is successful, a token will be stored in local storage and browser cookie.
- If login is successful, users can see their profile, lost items, claim requests, and found items.
- After login "My Profile" page link will be displayed in Navbar.
- After login if the user role is "ADMIN", "Dashboard" link will be displayed in Navbar which only admin can access.
- Users with `INACTIVE` status can't login into the application
- In Lost and Found items page user can see all the lost and found items with pagination.
- User can search using description key words, location, item name and filter using category name.
- In order to claim an found item user must be logged in
- In the "My Profile" page user can update their profile details, change password.
- In the "My Profile" page user can edit and delete their lost and found items
- Users can view there claim requests
- User can also view claim request on his founded item and approve or reject it.
- User can change item found status of their lost items. True if lost items is found and false if lost items is not found.
- Currently there is no dashboard for USER.
- There is a password confirmation alert that will be displayed if password and confirm password do not match.
- Before deleting users created lost and found item a alert will be displayed, which will ask for confirmation.
- Admin can manage users, users can Activate and deactivate users.
- Admin can view meta data including total number of users, total number of lost items, total number of found items, total number of claim requests, total number of claim approved, total number of claim rejected.

## Tools Used

- [TypeScript](https://www.typescriptlang.org/) - TypeScript
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Mui](https://mui.com/) - Material UI - React UI library
- [Redux Toolkit](https://redux-toolkit.js.org/) - Redux Toolkit - React state management
- [Axios](https://axios-http.com/docs/intro) - HTTP client
- [Mui Table](https://mui.com/material-ui/react-table/) - Data Grid - Material UI Table
- [Mui DatePicker](https://mui.com/x/react-date-pickers/) - Date Picker - Material UI Date Picker
- [Daysjs](https://day.js.org/) - JavaScript date library
- [jwt-decode](https://github.com/auth0/jwt-decode) - JSON Web Token decoder
- [sonner](https://sonner.vercel.app/) - Toast library
- [react-hook-form](https://react-hook-form.com/) - React hook form - Form validation library
- [JWT](https://jwt.io/) - JSON Web Token
- [Zod](https://zod.dev/) - TypeScript validation
- [Vercel](https://vercel.com/) - (Vercel) Serverless platform for hosting applications

## Getting Started

First, run the development server:

# Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/sajid1545/FoundIt-client.git
```

### Go to the project directory

```bash
 cd .\FoundIt-client\
```

## 2. Install the dependencies

```bash
npm install
```

## 3. Rename the file named `.env.example` to `.env` and then Add yours environment variables

## 4. Start the server

```bash
npm run dev
```

<br>
<br>

# [Deployed Client Link](https://assignment-9-client.vercel.app/)
