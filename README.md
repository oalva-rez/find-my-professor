# Find My Professor

This project is a React-based application designed to help students find information about their professors.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need Node.js and npm installed on your system to run the project.

- [Node.js](https://nodejs.org/)
- [npm](https://npmjs.com/)

### Installing

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/find-my-professor.git
cd find-my-professor
```

Then install the dependencies:

```bash
npm run install
```

### Running the App

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app. The page will automatically reload if you make any changes to the code.

### Build for Production

When you are ready to build the app for production, run the following command:

```bash
npm run build
```

This will bundle all the JavaScript into **/dist/assets/index-*[contenthash]*.js** file and optimize the build for the best performance.

### Publishing to OmniCMS
After creating a production build, you need to publish it to OmniCMS.

1. Copy all the contents of the **index-*[contenthash]*.js** file inside your React application.
2. Navigate to the **/find-my-professor** directory in OmniCMS.
3. Paste the JavaScript code into the **bundle.js** file inside the **/find-my-professor** directory in OmniCMS.
   
For CSS:

Navigate to the **/src** folder.
Copy all the contents of the main CSS file **(styles.css)**.
Paste the CSS code into the corresponding section of your CMS.

Lastly publish both sections of the **bundle.js** and **style.css** in OmniCMS.

## Authors
**Ozkar Alvarez** - *Initial Work*
