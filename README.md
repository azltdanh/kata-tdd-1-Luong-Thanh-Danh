# kata-tdd-1-Luong-Thanh-Danh
kata http://osherove.com/tdd-kata-1

## Set up environment:

### Install Node.js 

at http://nodejs.org/


### Install Karma, a test runner 

http://karma-runner.github.io/0.12/index.html

The recommended approach is to install Karma (and all the plugins your project needs) locally in the project's directory.

#### Install Karma:

'''
$ npm install karma --save-dev
'''

#### Install plugins that your project needs:

'''
$ npm install karma-jasmine karma-chrome-launcher --save-dev
'''

#### Install karma-cli globally.

'''
$ npm install -g karma-cli
'''

#### Run Karma:

'''
$ karma start
'''

### Install JSHint, a tool that helps to detect errors and potential problems in your JavaScript code. 

http://jshint.com/

'''
$ npm install jshint
'''

### Install Grunt, The Javascript Task Runner 

http://gruntjs.com

'''
$ npm install -g grunt-cli
'''

#### Install the latest version of Grunt in your project folder, adding it to your devDependencies

'''
$ npm install grunt --save-dev
'''

#### Install the JSHint task module

'''
$ npm install grunt-contrib-jshint --save-dev
'''

#### Install the uglify task module

'''
$ npm install grunt-contrib-uglify --save-dev
'''

Start TDD with test\kata-tdd-1-Luong-Thanh-Danh.test.js
- The method can take 0, 1 or 2 numbers, and will return their sum (for an empty string it will return 0) for example “” or “1” or “1,2”

Start implement with src\kata-tdd-1-Luong-Thanh-Danh.js