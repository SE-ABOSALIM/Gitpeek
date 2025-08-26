# Gitpeek
**Gitpeek** is a simple tool to quickly search GitHub user profiles and display essential profile information. Its user-friendly interface lets you explore GitHub profiles instantly.
<br><br>
## Features
- Search GitHub profiles by username
- Display profile picture, name, bio, and other basic info
- Check all links and social usernames
- Fast and easy-to-use interface
<br><br>
## Installation
1. Clone the repository:
```bash
git clone https://github.com/SE-ABOSALIM/gitpeek.git
```
2. Go into the project folder:
```bash
cd gitpeek
```
3. Open `index.html` in your browser (preferably via a local server, see Usage section)
<br><br>
## Usage
To run the project correctly, you need to serve it via a local server instead of opening `index.html` directly. This is necessary because modern browsers block certain API requests (like GitHub API) when opening files directly.

### Method 1
1. Open a terminal in your project folder.
2. Run one of the following commands:
```bash
python -m http.server 8000
```
#### Or
```bash
python -m SimpleHTTPServer 8000
```
3. Open your browser and go to:
```bash
http://localhost:8000/Html
```
### Method 2
1. Install the Live Server extension in VS Code.
2. Open the project folder in VS Code.
3. Right-click on index.html → Select Open with Live Server.
4. Your browser will open the project via a local server automatically.
<br><br>
## License
This project is licensed under the **MIT License**.  
