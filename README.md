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
There are key-value pairs and contexts. Each context has curly brakcets within which are key-value pairs that determine the function of the context. 
![nginxcontextfile](https://github.com/naqeebghazi/nginx.darey/blob/main/images/nginxcontext.png?raw=true)

We customise the nginx.conf file and put the path of the items we wish to serve to the browser (only the directory path is required, not the index file itself:
  
    http {
        server {
            listen 8080;
            root /Users/User1/nginx.darey/mysite;
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
            root /Users/User1/nginx.darey/mysite;    #filepath that contains the files that we want to serve when this port is accessed
        }
    }
    
    events {}
    

To this which used mime.types:

    http {
    
    include mime.types;
    
        server {
            listen 8080;
            root /Users/User1/nginx.darey/mysite;    #filepath that contains the files that we want to serve when this port is accessed
        }
    }
    
    events {}
  

Both of these configurations output the same content to the browser:
![cssinbrowser](https://github.com/naqeebghazi/nginx.darey/blob/main/images/cssinbrowser.png?raw=true)

## Location Block


