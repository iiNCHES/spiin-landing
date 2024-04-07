# How to work with these files

## Requirements

* Node/NPM
* Grunt CLI

## Getting Started
### 1 - Installing NPM

*Please skip this step if you already have NPM installed.*

Visit https://nodejs.org/en/ to download and install on your platform.

After install verify it worked by opening up a command line tool and enter this command:

```bash
npm -v
```

If you see a version number it has been installed correctly.

### 2 - Installing Grunt CLI:
*Please skip this step if you already have the Grunt CLI installed.*

Open a command line tool and enter this command:

```bash
npm install -g grunt-cli
```
 
### 3 - Install Node Modules:

Open a command line tool, change directory to the project and enter this command:

```
npm install
```

## Get Working
### 1 - Start Grunt Process

Open a command line tool, change directory to the project and enter this command:

```
grunt
```

This will start up the grunt default task and start we connect server

You should see this:

```bash
Running "connect:server" (connect) task
Started connect web server on http://localhost:8000

Running "watch" task
Waiting...
```

In a web browser, go to http://localhost:8000 to view the site.

**To stop server**: `ctl + c` on Windows and `cmd + c` on OSX. 

### 2 - Working with the Files

All your edits should be done in the `app` folder. Please do NOT edit anything in the `build` folder. Grunt will build these files for you every time there is a change in the `app` folder.

#### Working with Pug

This project uses a HTML preprocessor called Pug (https://pugjs.org/api/getting-started.html). It uses a template and includes based system and is separated out into 3 different section.

1. Layout
2. Pages
3. Partials

There are also multiple variables that are being passed through the template that controls certain elements and colors.

#### 3rd Party Javascript
JavaScript is auto compiled into bundles. This is done automatically. If the Grunt process is running, just adding a 3rd party plugin to the `lib` folder will cause an auto compile. You do **not** need to add it to the layout via a `script` tag.
