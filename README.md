
# Bid Buddy

Bid Buddy is a dynamic auction platform where anyone can sign up, place bids on listed items, and create their own items for auction. Our user-friendly interface ensures you can easily navigate through active auctions and keep track of your bids. Additionally, Bid Buddy notifies you if someone outbids you, ensuring you never miss a chance to win your desired item.

## 🌐Demo

Explore the live project - https://bid-buddy-alpha.vercel.app/


## 🚀Key Features
- User Registration: Sign up to start bidding or to create your own auctions.
- Place Bids: Browse through listed items and place your bids to participate in exciting auctions.
- Create Auctions: Have something to sell? Create your own auction listings effortlessly.
- Set Auction End Date: Specify an end date for your auctions to control when bidding will close.
- Outbid Notifications: Stay informed! Receive notifications if someone outbids you, ensuring you never miss a chance to win your desired item.

## 🛠️Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Drizzle ORM Postgres Js
- Supabase
- Firebase for Image hosting
- Next Auth for Authentication
- Knock for Notifications
- Shadcn UI for reusable components
- React Icons
- Zod for Form validation
- Next themes for theme management
- Vercel for deployment
## 🏁 Get Started
To get this project up and running in your development environment, follow these step-by-step instructions.
## 📝 Prerequisites
In order to install and run this project locally, you would need to have the following installed on your local machine.
- [Node js](https://nodejs.org/en/)
- [NPM](https://docs.npmjs.com/getting-started)
- [Git](https://git-scm.com/downloads)
## ⚙️ Installation and Run Locally

#### step 1
Download or clone this repo by using the link below:
```
https://github.com/LitPreet/Bid-Buddy.git
```
#### step 2
Execute the following command in the root directory of the downloaded repo in order to install dependencies:
```
npm install
```
### step 3
Execute the following command in order to run the development server locally:
```
npm run dev
```
### step 4
Open http://localhost:3000 with your browser to see the result.
## 📜 Scripts
| Script       | Action         
| ------------- |:-------------
| ```npm install```      | Installs dependencies
| ```npm run dev```      | Starts local dev server at ```localhost:3000  ```  
| ```npm run build``` | Build your production site to ```./dist/```    
| ```npm run start``` | Start your production site locally
| ```npm run lint``` | Run ESLint |

## 🔒 Environment Variables
```
DATABASE_URL=postgresql://username:password@hostname:port/database
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
AUTH_DRIZZLE_URL=postgresql://username:password@hostname:port/database
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY=your_knock_public_api_key
NEXT_PUBLIC_KNOCK_FEED_ID=your_knock_feed_id
KNOCK_SECRET_KEY=your_knock_secret_key
NEXT_PUBLIC_FIREBASE_API=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

```
## 🚀 Deployment
You can create an optimized production build with the following command:
```
npm run build
```
#### Deploy on Vercel
The easiest way to deploy this Next.js app is to use the Vercel Platform.
[Vercel Platform](https://vercel.com)