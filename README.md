# "Node.js Tutorial - How to Build a Web Server"

✅ [Check out my YouTube Channel with all of my tutorials](https://www.youtube.com/DaveGrayTeachesCode).

**Description:**

This repository shares the code applied during the Youtube tutorial. The tutorial is part of a [Node.js for Beginners Playlist](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw) on my channel.  

[YouTube Tutorial](https://youtu.be/3ZAKY-CDKog) for this repository.

I suggest completing my [8 hour JavaScript course tutorial video](https://youtu.be/EfAl9bwzVZk) if you are new to Javascript.

### Academic Honesty

**DO NOT COPY FOR AN ASSIGNMENT** - Avoid plagiargism and adhere to the spirit of this [Academic Honesty Policy](https://www.freecodecamp.org/news/academic-honesty-policy/).

## How to Create .env file

- create a file named ".env" in the root directory of the repository
- open a new terminal and type node and press Enter
- then type the following command and press enter
  - `require('crypto').randomBytes(64).toString('hex)`
- You get a code in terminal! Copy that code and save it in the .env file as,
  - ACCESS_TOKEN_SECRET = `copied code`
- Same way generate another code and append the code in the .env file in new line as,
  - REFRESH_TOKEN_SECRET = `copied code`
