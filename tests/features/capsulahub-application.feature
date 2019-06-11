
 Feature: CapsulaHub application

 Background:
    Given a npm package called @capsulajs/capsula-hub
    And   a default port 55555
    And   a valid port is a number between 1024 and 65535

 Scenario: Run Capsula-Hub  instance with a valid config file path without specifying the port
    When  I run the command `capsula-hub run -l <path>` in the relevant directory
		 | <path>         |
		 | conf.js        |
		 | config/conf.js |
		 | src/config/conf.js|
    Then  the application is running on the default port
    And   workspace is created with the specified config file

 Scenario: Run Capsula-Hub instance with a valid config file path specifying a valid port
    When  I run the command `capsula-hub run -l conf.js -p 44444`
    Then  the application is running on the specified port
    And   workspace is created with the specified config file

 Scenario: Run Capsula-Hub instance with a valid config file path specifying an invalid port
    When  I run the command `capsula-hub run -l conf.js -p <port>`
		 |<port>|
		 | abc  |
		 | 123a |
		 | 65536|
		 | 0    |
    Then  I expect to receive an error

 Scenario: Run Capsula-Hub instance with a config path that does not exist in the repository
    Given conf3.js config file doesn't exist
    When  I run the command `capsula-hub run -l conf3.js`
    Then  I expect to receive `Error: Cannot find module '.../conf3.js'`

 Scenario: Run Capsula-Hub  instance with a wrong path to an existing configuration file
    When  I run the command `capsula-hub run -l src/conf.js`
    Then  I expect to receive `Error: Cannot find module '...src/conf.js'`

 Scenario: Run Capsula-Hub  instance with a valid config file path twice on the same port
    When  I run the command `capsula-hub run -l conf.js -p 55555`
    And   I run the same command again
    Then  I expect to receive `Error: listen EADDRINUSE :::55555`

 Scenario: Run Capsula-Hub  instance with 2 valid config file paths on the same port
    Given I run `capsula-hub run -l conf.js`
    And   an workspace instance is created with conf.js and is running on port 55555
    When  I run `capsula-hub run -l conf1.js`
    Then  I expect to receive `Error: listen EADDRINUSE :::55555`

Scenario: Run Capsula-Hub  instance with the same config file path on two different ports
    When  I run the command `capsula-hub run -l conf.js -p 8888`
    And   I run the command `capsula-hub run -l conf.js`
    Then  an workspace instance is created with the config file conf.js and is running on port 8888
    And   an workspace instance is created with the config file conf.js and is running on port 55555

 Scenario: Run Capsula-Hub instance with different config files on different ports
    When  I run the command `capsula-hub run -l conf.js -p 8888`
    And   I run the command `capsula-hub run -l conf1.js -p 9999`
    Then  an workspace instance is created with the config file conf.js and is running on port 8888
    And   an workspace instance is created with the config file conf1.js and is running on port 9999

 Scenario: Run Capsula-Hub  instance without config file path without specifying the port
    When I run the command `capsula-hub run -l`
    Then I expect to receive `error: option '-l, --local <path-to-file>' argument missing`

 Scenario: Run Capsula-Hub  instance without config file path specifying the port
    When I run the <command>
		 |<command>                  |
		 |capsula-hub run -p 88888   |
		 |capsula-hub run -l -p 88888|
    Then I expect to receive  `No flag given to run the app. Please try "capsula-hub run -l <config_file>"`

Scenario: Run Capsula-Hub  instance with valid config file path and with `-p` with no port
    When I run `capsula-hub run -l conf8888.js -p`
    Then I expect to receive `error: option '-p, --port <port>' argument missing`


