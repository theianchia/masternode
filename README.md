<div id="top"></div>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="assets/logo.jpg" alt="Logo" width="400">
  <h3 align="center">MasterNode</h3>
  <p align="center">
    Cake DeFi JavaScript React Exercise - Masternode assets under management
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started"">Getting Started</a>
    </li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#design-considerations">Design Considerations</a>
    </li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project
MasterNode is a platform for users to 
* easily view the total assets managed by Cake DeFi by node
* track the latest staking rewards by node
* track the value of each coin

<p align="right">(<a href="#top">back to top</a>)</p>


## Built With

### Frontend
* [Next.js](https://nextjs.org/)
* [Tailwind](https://tailwindcss.com/)
* [Chart.js](https://www.chartjs.org/)

### External APIs used
* [Cake DeFi Nodes API](https://api.cakedefi.com/nodes?order=status&orderBy=DESC)
* [CoinGecko API](https://www.coingecko.com/en/api)

<p align="right">(<a href="#top">back to top</a>)</p>


## Getting Started

### Prerequisites
* node v19.7.0

### Install Node dependencies
Run `npm install` to install dependencies

### Running the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<p align="right">(<a href="#top">back to top</a>)</p>


## Features

<p align="right">(<a href="#top">back to top</a>)</p>


## Design Considerations
[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

<p align="right">(<a href="#top">back to top</a>)</p>


## Acknowledgement
I would like to thank Cake DeFi for giving me the resources to work on such an interesting assignment. Special thanks to the various libraries and API provides for making this possible as well
