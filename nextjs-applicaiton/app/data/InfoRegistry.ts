import {
  FileIcon,
  GithubIcon,
  Globe,
  LinkedinIcon,
  MailIcon,
  SmartphoneCharging,
} from "lucide-react";
import { IdContentMap, PARENT_FOLDERS } from "../types/CardShapes";

const _InfoRegistry = {
  aboutme: {
    parentFolder: PARENT_FOLDERS.ABOUT_ME,
    title: "Luke Edwards ",
    subtitle: "Here's a little bit about me...",
    description:
      "My name is Luke Edwards, I'm a software engineer that loves to build fun software that my friends can use. I am a 4th year student at the University of Victoria studying Computer Science with honors in sofware systems. I am currently seeking my second full-time software engineering internship starting summer 2026. Right now, I'm working on a recipe helper mobile app called Krumbz with 3 of my talented friends.",
    description2:
      "Since I first played Pokemon Diamond when I was 10, my passion for programming has only grown. As you have probably guessed from this website, I love combining my love for video games and programming to create software that makes people smile :) For my other interests, I am a die-hard Toronto Raptors fan, and I love to try new types of craft beer with my friends.",
    links: [
      {
        name: "LinkedIn",
        icon: LinkedinIcon,
        url: "https://www.linkedin.com/in/luke-p-edwards",
      },
      {
        name: "GitHub",
        icon: GithubIcon,
        url: "https://github.com/LukeDoesJava",
      },
      {
        name: "Email",
        icon: MailIcon,
        url: "mailto:luke0edwardss@gmail.com",
      },
      {
        name: "Resume",
        icon: FileIcon,
        url: "/Luke_Edwards_Resume.pdf",
      },
    ],
    imagePathDir: "me",
    workDetails: {
      detail1: {
        type: "Programming Languages",
        detail: "Python, TypeScript, Java, C, HTML, CSS",
      },
      detail2: {
        type: "Frameworks",
        detail:
          "React, React Native, Redux, Expo, Zustand, Next.js, Node.js, MySQL, PostgreSQL, Docker, GraphQL, Tailwind CSS",
      },
      detail3: {
        type: "Tools",
        detail: "Git, GitHub, Docker, CI/CD, Figma, AWS EC2, AWS S3,",
      },
      detail4: {
        type: "Spoken Languages",
        detail: "English, French",
      },
    },
  },
  dmginc: {
    parentFolder: PARENT_FOLDERS.WORK_EXPERIENCE,
    title: "dmginc.gg",
    subtitle: "Gaming Community & Event Platform",
    description:
      "A long-standing web application and Discord integration serving a community of 5+ years. As a Frontend Developer, I helped maintained the platform's event-management system, which allows users to host sessions, track attendance, and compete in community leaderboards. The platform features a real-time reputation engine that syncs user engagement between the web dashboard and the Discord server to foster a trusted gaming environment.",
    description2:
      " My role at dmginc was supporting the different user interfaces that supported tracking our user's leaderboards and personal statistics. I worked on connection new API endpoints to our websites, and introduces different UI widgets to allow user's to customize their profile view. Furtermore, I was also responsible for tracking and verifying different bugs brought forward by our community members.",
    workDetails: {
      detail1: {
        type: "Role",
        detail: "Volunteer Frontend Developer",
      },
      detail2: {
        type: "Technologies",
        detail: "React, Typescript, React Query, TailwindCSS",
      },
      detail3: {
        type: "Start Date",
        detail: "April 2025",
      },
      detail4: {
        type: "End Date",
        detail: "September 2025",
      },
    },
    links: [{ name: "Website", icon: Globe, url: "https://dmginc.gg/" }],
    imagePathDir: "dmginc",
  },
  novamaps: {
    parentFolder: PARENT_FOLDERS.WORK_EXPERIENCE,
    title: "Nova Maps",
    subtitle: "Drone mapping software for emergency response teams",
    description:
      "As a Full-Stack Software Engineer Intern, my work focused on developing, maintaining, and developing different mapping collaboration features for emergency response teams. I engineered a 3D terrain rendering feature utilizing elevation data (DEMs), enabling the development of advanced elevation-based features and layers for mission planning. Additionally, I migrated core mapping libraries, including Deck.gl and MapLibre, to current versions within the application, resolving breaking changes and refactoring legacy code to maintain performance.",
    description2:
      "I coordinated directly with the Sales and Customer Success teams to intake and prioritize critical issues, delivering bug fixes for core mapping functionalities within 24 hours to maintain client satisfaction. One of my key technical achievements was implementing a global Resource State Manager to coordinate complex data coordination across mapping libraries, which eliminated internal resource race conditions and yielded a 2x performance boost in map tiling on terrain.",
    workDetails: {
      detail1: {
        type: "Role",
        detail: "Full-Stack Software Engineer Intern",
      },
      detail2: {
        type: "Technologies",
        detail:
          "Typescript, React, Node.js, Next.js, TailwindCSS, Redux, Jira, AWS, DeckGL, Protobuf",
      },
      detail3: {
        type: "Start Date",
        detail: "September 2025",
      },
      detail4: {
        type: "End Date",
        detail: "December 2025",
      },
    },
    imagePathDir: "nova-maps",
    links: [{ name: "Website", icon: Globe, url: "https://www.mapnova.com/" }],
  },
  krumbz: {
    parentFolder: PARENT_FOLDERS.PROJECTS,
    title: "Krumbz",
    subtitle: "Recipe Helper Mobile App (for iOS)",
    description:
      "An IOS mobile app built using React Native to solve the age old problem of having too many ingredients and having no one idea what to make. Users can upload photos, recepts, or voice memos of their grocery hauls to keep track of their fridge. Our application parses the internet to determine the most immediately accessible recipes, alongside supporting logging and tracking for nutrition goals.",
    description2:
      "I am currently building this app alongside 3 of my highschool friends. My responsibilities have included building our API microservices using Python, designing the app using Figma, and managing our developer tools such as Github Actions and Jest. Currently, I am working on overhauling our webscraping architecture by creating a task scheduler and queue system to manage and track the status of scraper jobs. Furthermore, I am working on a developer suite GUI that allows devs to easily determine what jobs are failing and identify the point of failiure.",
    workDetails: {
      detail1: {
        type: "Frontend",
        detail: "Typescript, React Native, Zustand, Jest, Storybook, Expo",
      },
      detail2: {
        type: "Backend",
        detail: "Python, Docker, Go, PostgresSQL, BeautifulSoup, Selenium",
      },
      detail3: {
        type: "Where can I find it?",
        detail:
          "Currently, we are in a private Testflight of our app, but feel free to reach out if you're intrested!",
      },
    },
    links: [
      {
        name: "App Store (coming soon!)",
        icon: SmartphoneCharging,
        url: "",
      },
    ],
    imagePathDir: "krumbz",
  },
  algovisual: {
    parentFolder: PARENT_FOLDERS.PROJECTS,
    title: "Algo//Visual",
    subtitle: "Algorithm Visualization",
    description:
      "A solo project that I initially built for my own desire to learn shortest path algorithms, but expanded it to include a variety of sorting algorithms and pathfinding algorithms. The application is built with TypeScript and React, and uses Tailwind for styling. The website currently supports a maze pathfinding algorithm, where users can generate a maze and select a variety of algorithms to visualize the pathfinding process. I am currently working on expanding the website to include different types of algorithm vizualizations, such as a sorting algorithm visualizer and pathfinding algorithm visualizer for real world maps.",
    workDetails: {
      detail1: {
        type: "Start Date",
        detail: "June 2024",
      },
      detail2: {
        type: "Technologies",
        detail: "Typescript, React, TailwindCSS, Vercel, DaisyUI",
      },
    },
    links: [
      {
        name: "Website",
        icon: Globe,
        url: "https://algo-visualizer-wheat.vercel.app/",
      },
      {
        name: "Repository",
        icon: GithubIcon,
        url: "https://github.com/LukeDoesJava/algoVisualizer",
      },
    ],
    imagePathDir: "algovisual",
  },
  pokefolio: {
    parentFolder: PARENT_FOLDERS.PROJECTS,
    title: "Pokéfolio",
    subtitle: "Pokemon themed developer portfolio",
    description:
      "What you're seeing right now! A Pokemon theme developer portfolio built with React, Next.js and Phaser.JS. This concept was inspired by a previous boss of mine who had a Mario Galexy theme portfolio where the user could fly to different galexies to learn about his previous projects. I decided to take this concept and apply it to my own portfolio, but with a Pokemon theme instead.",
    description2:
      "This portfolio is comprised of two major pieces: the HTML content that displays the project information, and the PhaserJS game map that allows the user to navigate to different sections of the portfolio. The HTML content is built with React, Next.js and TailwindCSS, and the map was built with RPGMaker XP. In order to bridge the two, I created a custom buffer reader that allows the webpage to synchronize the game's state in order to display the correct content for the user when entering the different houses in game. While not a full-fledged game, it did require a lot of creativity and problem solving to get the two to work together, especially implementing the gameboy styled controls when the page is being viewed on a mobile device (Try it out on your phone!).",
    workDetails: {
      detail1: {
        type: "Start Date",
        detail: "January 2026",
      },
      detail2: {
        type: "Technologies",
        detail: "React, Next.js, Node.js, TailwindCSS, RPGMaker XP, Phaser.JS",
      },
    },
    imagePathDir: "pokefolio",
    links: [
      {
        name: "Repository",
        icon: GithubIcon,
        url: "https://github.com/LukeDoesJava/pokefolio",
      },
    ],
  },
  credits: {
    title: "Credits",
    subtitle: "Thank you's and disclaimers",
    description:
      "This project couldn't have been possible without the generosity of the various open source resources that I used to build it. I am no professional artist, so I am grateful to the many artists and developers that helped me bring this project to life.",
    description2:
      "Disclaimer: This website is a fan-made project and is not affiliated with, endorsed by, or associated with Nintendo, Game Freak, The Pokémon Company, or any of their subsidiaries or affiliates. Pokémon, along with all related characters, names, and distinctive likenesses thereof, are trademarks and copyrights of Nintendo, Game Freak, and The Pokémon Company. All rights reserved. This project is created purely for educational, entertainment, and non-commercial purposes. No copyright infringement is intended.",
    workDetails: {
      detail1: {
        type: "Sprite and map assets (as seen in game)",
        detail: "Artists",
      },
      detail2: {
        type: "Pokemon Essentials (Music & Sound effects assets)",
        detail: "https://essentialsdocs.fandom.com/wiki/About",
      },
    },
    imagePathDir: "credits",
  },
  "no-display": {
    title: "No Display",
    subtitle: "No Display",
    description: "No Display",
    description2: "No Display",
    workDetails: {
      detail1: {
        type: "No Display",
        detail: "No Display",
      },
    },
  },
} satisfies IdContentMap;

// Extract literal keys from the object (before type annotation is applied)
export type CardID = keyof typeof _InfoRegistry;

export const InfoRegistry: IdContentMap = _InfoRegistry;
export const selectInfoContent = (id: CardID) => InfoRegistry[id];
export const ContentCardIds = Object.keys(InfoRegistry) as CardID[];
