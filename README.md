Demo Site
=

This is a demonstration site using Angular, Bootstrap and Github Pages.  It provides searches against a national pet database provided by petfinder.com.   


Usage
=  
Enter a zip code (5 digits) and click the search button to see pets in your area that are available for adoption.  Click on the picture to get a larger image of the pet.  


Git  
=  
git clone git@bitbucket.org:bfhike/github-angular-site.git  
git remote add bfyahoo git@github.com:bobfyahoo/bobfyahoo.github.io.git  
git remote add oygavult        git@github.com:bikehike/bikehike.github.io.git  

should see these remotes in git  
-

bfyahoo git@github.com:bobfyahoo/bobfyahoo.github.io.git (fetch)  
bfyahoo git@github.com:bobfyahoo/bobfyahoo.github.io.git (push)  
bitbucket       git@bitbucket.org:bfhike/github-angular-site.git (fetch)  
bitbucket       git@bitbucket.org:bfhike/github-angular-site.git (push)  
oygavult        git@github.com:bikehike/bikehike.github.io.git (fetch)  
oygavult        git@github.com:bikehike/bikehike.github.io.git (push)

check CNAME
-
push to repo depending on CNAME. change CNAME for other.

bobferrero.com --> bfyahoo  
oygavult.com --> oygavult  


Development
====  
npm install  
npm test  
npm run protractor  
npm start to run on port 443 with https://www.example.com  

Useful commands
-
npm audit fix  
npm doctor  

On Windows
=
cd c:\windows\system32\drivers\etc
notepad hosts
127.0.0.1 www.example.com