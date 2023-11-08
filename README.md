# NGINX Notes

[The Nginx website](https://www.nginx.com/)

nginx can be used in the following ways:
  - reverse proxy
  - load balancer
  - encryption

For an excellent summary:
https://www.papertrail.com/solution/guides/nginx/

![nginxfunctions](https://www.nginx.com/wp-content/uploads/2018/10/NAP-with-Controller-2-0.png)

## [NGINX Pros vs. Cons](https://www.elegantthemes.com/blog/wordpress/what-is-nginx-an-overview-of-the-basics) 
Most hosting providers use Apache or NGINX web server software. If you’re still unsure which option would work best for your website, let’s look at some of the advantages and disadvantages of using NGINX. Fortunately, NGINX offers a wealth of benefits. 

For instance: 
  - It uses less memory and resources than other server software options.
  - It is compatible with several web applications, including Ruby, Python, and Joomla.
  - You’ll get faster loading times, which can help improve your overall performance and rankings in the Search Engine Results Pages (SERPs).
- 
NGINX also comes with a modern interface and user-friendly configuration settings. Since it’s event-based and uses fewer hardware resources, it can handle multiple connections without additional expenses. Therefore, it can be more cost-effective than other web server software.
However, NGINX also comes with a few downsides. For instance, it only has one single configuration file, making it less flexible than Apache.
Additionally, while the software is open source, you get less control over its modules. You also won’t be able to disable any of them. This means you’re more restricted when customizing an NGINX server to your specific needs.
However, if performance is your top priority, NGINX might be the right choice for you. It is also the ideal solution for websites with large amounts of traffic. It just scales better than Apache or other competitors.
A powerful server software such as NGINX can help minimize downtime and prevent long loading times. These characteristics mean NGINX can serve content to your users more efficiently, leading to more conversions.


Installing nginx:
Mac:
  - In terminal enter:
    $ brew install nginx

    This installs nginx in the MacOS location: /usr/local/etc/nginx
    The contents of this file locations:
    ![nginxconf](https://github.com/naqeebghazi/nginx.darey/blob/main/images/Screenshot%202023-11-05%20at%2023.26.02.png?raw=true)

  - To start nginx:
    ![executenginxlocally](https://github.com/naqeebghazi/nginx.darey/blob/main/images/executeNginxLocally.png)

  - Then go to your browser and enter: localhost:8080
    You will see this message to confirm successful setup of nginx on your system:
    ![browsernginx](https://github.com/naqeebghazi/nginx.darey/blob/main/images/nginxlocalhost.png)

Understanding the nginx.conf file in the etc/nginx directory.
 - key-value pairs
 - contexts
Each context has curly brakcets within which are key-value pairs that determine the function of the context. 

![nginxcontextfile](https://github.com/naqeebghazi/nginx.darey/blob/main/images/nginxcontext.png?raw=true)

We customise the nginx.conf file and put the path of the items we wish to serve to the browser (only the directory path is required, not the index file itself:
  
    http {
        server {
            listen 8080;
            root /Users/user1/darey.io;
        }
    }
    
    events {}

After the nginx.conf file is configured, nginx must be reloaded in the terminal:

    nginx -s reload

Then refresh your browser and the contents of your index.html file will be visible. 

All the content of your webpage will be stored in the mysite directory. In this example, the two files are stless.css and the original index.html:

![html](https://github.com/naqeebghazi/nginx.darey/blob/main/images/htmlshot.png?raw=true)

![css](https://github.com/naqeebghazi/nginx.darey/blob/main/images/stylescss.png?raw=true)

## MIME types
Mime.types saves you the need to reference every file that serves content and so the nginx.conf file wil be edited to be as follows:

From being this:
    
    http {
    
        types {
            text/css    css;
            text/html   html;
    
        }
    
        server {
            listen 8080;
            root /Users/user1/darey.io;    #filepath that contains the files that we want to serve when this port is accessed
        }
    }
    
    events {}
    

To this which used mime.types:

    http {
    
    include mime.types;
    
        server {
            listen 8080;
            root /Users/user1/darey.io;    #filepath that contains the files that we want to serve when this port is accessed
        }
    }
    
    events {}
  

Both of these configurations output the same content to the browser:
![cssinbrowser](https://github.com/naqeebghazi/nginx.darey/blob/main/images/cssinbrowser.png?raw=true)

## Location Block

The location block specifies more content for the site. It specifies the locations of the files to serve on a given webpage. 
Location+root requires its own directory.
Location+alias does not require a directory and can be pointed toward the root directory. Example:

    http {
    
        types {
            text/css    css;
            text/html   html;
    
        }
    
        server {
            listen 8080;
            root /Users/user1/darey.io/nginx.darey/mysite;    #filepath points to files to serve when port 80 is accessed
            
            location /animals {
                root /Users/user1/darey.io;
            }
    
            location /carbs {
                alias /Users/user1/darey.io/animals;
            }
            
        }
    }
    
    events {}

## Try Files

By default, nginx looks for the index.html file in the root folder, but if that that isnt found for whatever reason, it'll look at alternative locations; this is where try_files helps. The try_files location below lists two locations in order of priority (veggies.html, index.html), each seperated by a space. The '=404;' means if none of these locations exist, display a 404 error. 

    http {
    
        types {
            text/css    css;
            text/html   html;
    
        }
    
        server {
            listen 8080;
            root /Users/user1/darey.io/nginx.darey/mysite;    #filepath that contains the files that we want to serve when this port is accessed
            
            location /animals {
                root /Users/user1/darey.io/nginx.darey/mysite;
            }
    
            location /carbs {
                alias /Users/user1/darey.io/animals;
            }
    
            location /vegetables {
                root /Users/user1/darey.io/nginx.darey/mysite;
                try_files /vegetables/veggies.html /index.html =404;
            }
        }
    }
    
    events {}


## Using a regular expression

Regular expressions (line 197) can be used to 

    http {
    
        types {
            text/css    css;
            text/html   html;
    
        }
    
        server {
            listen 8080;
            root /Users/user1/darey.io/nginx.darey/mysite;    #filepath that contains the files that we want to serve when this port is accessed

            location ~* /count/[0-8] {
                root /Users/nghazi/DevOps/darey.io/nginx.darey/mysite;
                try_files /index.html =404;
            }
            
            location /animals {
                root /Users/user1/darey.io/nginx.darey/mysite;
            }
    
            location /carbs {
                alias /Users/user1/darey.io/animals;
            }
    
            location /vegetables {
                root /Users/user1/darey.io/nginx.darey/mysite;
                try_files /vegetables/veggies.html /index.html =404;
            }
        }
    }
    
    events {}

## Redirect

Add a new location block with the following code if we want a new name (e.g. /creatures) to redirect to a current name (e.g. /animals) or vice versa:

              location /creatures {
                          return 307 /animals;
                      }
Save and reload nginx. 

Now, if I type localhost:8080/creatures into my browser, it redirects to localhost:8080/animals. 

## Rewrite

When you want to direct a URL toward a root index file (line 13, 14 below):

![rewrite](https://github.com/naqeebghazi/nginx.darey/blob/main/images/rewrites.png?raw=true)

So now, for example, of you type localhost:8080/food it will redirect you to localhost:8080/vegetables

## Load-balancing

For nginx to run as a load balancer, you need multiple servers on the backend. 
The node where the ngnix server is installed must have npm (a node application) first installed:

    $ brew install npm

Move into the a new server directory and then initalise npm:

    $ mkdir server
    $ npm init -y

This will initialise npn and create a package.json file in the new server directory.
Now run the following to initialise this directory as a server:

    $ npm install express

Enter the following into the index.js file in the server directory:

![node.js simple node code](https://github.com/naqeebghazi/nginx.darey/blob/main/images/indexjs.png?raw=true)

To then start the node application, can do one of two ways:
- manually via terminal
  -   $ node index.js
- editing package.json
  - Under the "scripts" section, type: "start": "npm index"
  - Then typing $npm run start into the terminal.
 ![npmRunStart](https://github.com/naqeebghazi/nginx.darey/blob/main/images/packagejson.png?raw=true)

This can then be viewed in a web browser:
![browser7777](https://github.com/naqeebghazi/nginx.darey/blob/main/images/browser7777.png?raw=true)

Ensure the port number stated in the index.js file is typed into the browser address bar.

Create a docker file in the same directory:
![dockerfile]()

This creates the docker image which can then be used to create docker containers.
Use -p to port map. In the example below, port 7777 stated in the index.js is mapped to ports 1111 and 2222 on my local computer:
![dockerbuild_run]()

Docker Desktop must be installed for docker to run:

