Feature: Build and Run commands for CapsulaHub CLI

  Background:
    Given an npm package called @capsulajs/capsula-hub
    And   a default port 55555
    And   a default configProvider httpFile
    And   the following <configProvider> available
          |<configProvider>                   |
          |LocalFileConfigurationProvider     |
          |HttpFileConfigurationProvider      |
          |HardcoreServerConfigurationProvider|
          |HttpServerConfigurationProvider    |
          |LocalStorageConfigurationProvider  |
    And   a default path to the output folder "./dist"
    And   a valid port is a number between 1024 and 65535

  Scenario: Run Capsula-Hub instance with specifying valid arguments
    Given a valid token with configuration
    When  I run the command `capsula-hub run --token="token" --configProvider="configProvider" --dispatcherUrl="dispatcherUrl" --port="port"` #add dispatcherUrl only for hardcoreServer provider
    Then  an workspace is created
    And   workspace is running on localhost on the specifying port
    And   the specified configProvider is used

  Scenario: Run Capsula-Hub instance without specifying the port and configProvider
    Given a valid token with configuration
    When  I run the command `capsula-hub run --token="token"`
    Then  an workspace is created
    And   workspace is running on localhost on the default port
    And   httpFile is the configuration provider used

  Scenario: Run Capsula-Hub instance with invalid token
    When  I run the command `capsula-hub run --token="token"`
    And   one of the following values for <token> is provided
          |<token>     |
          |''        |
          |{}        |
          |{ test: 'test' }|
          |[]        |
          |['test']  |
          |null      |
          |undefined |
          |true      |
          |false     |
          |0         |
          |-1        |
    Then  a relevant error is received

  Scenario: Run Capsula-Hub instance with invalid port
    Given a valid token with configuration
    When  I run the command `capsula-hub run --token="token" --port="port" `
    And   one of the following values for <port> is provided
          |<port>    |
          | 'abc'    |
          | 65536    |
          | 0        |
          |{}        |
          |{ test: 'test' }|
          |[]        |
          |['test']  |
          |null      |
          |undefined |
          |true      |
          |false     |
          |-1        |
    Then  a relevant error is received

  Scenario: Run Capsula-Hub instance with an invalid value of <configProvider>
    Given a valid token with configuration
    When  I run the command `capsula-hub run --token="token" --configProvider="configProvider" `
    And   one of the following values for <configProvider> is provided
          |<configProvider>    |
          | 'abc'    |
          | 65536    |
          | 0        |
          |{}        |
          |{ test: 'test' }|
          |[]        |
          |['test']  |
          |null      |
          |undefined |
          |true      |
          |false     |
          |-1        |
    Then  a relevant error is received

  Scenario: Run Capsula-Hub instance with an non-existent configProvider throws an error
    Given a valid token with configuration
    When  I run the command `capsula-hub run --token="token" --configProvider="configProvider" `
    And   "configProvider" is not in the list of available configuration types
    Then  a relevant error is received

  Scenario: Run Capsula-Hub instance twice on the same port
    Given a valid token with configuration
    And   a valid port
    When  I run the command `capsula-hub run --token="token" --port="port" `
    And   I run the same command again
    Then  a relevant error is received

  Scenario: Run Capsula-Hub  instance with the same token for different configProvider on two different ports
    Given a valid token with configuration
    And   two valid ports "port1" and "port2"
    When  I run the command `capsula-hub run --token="token" --configProvider="hardcoreServer" --dispatcherUrl="dispatcherUrl" --port="port1 "`
    And   I run the command `capsula-hub run --token="token" --port="port2"`
    Then  an workspace instance is created that is running on port "port1"
    And   hardcoreServer is the configuration provider used
    And   an workspace instance is created that is running on port "port2"
    And   httpFile is the configuration provider used

  Scenario: Run `capsula-hub build` with specifying valid arguments
    Given a valid token with configuration
    When  I run the command `capsula-hub build --token="token" --configProvider="configProvider" --dispatcherUrl="dispatcherUrl" --output="output"` #add dispatcherUrl only for hardcoreServer provider
    Then  the app is built
    And   the result of the build is put in the specifying output path
    And   the specified configProvider is used

  Scenario: Run `capsula-hub build` without specifying the output and configProvider
    Given a valid token with configuration
    When  I run the command `capsula-hub build --token="token"`
    Then  the app is built
    And   the result of the build is put in the default output path "./dist"
    And   httpFile is the configuration provider used

  Scenario: Run `capsula-hub build` with invalid token
    When  I run the command `capsula-hub build --token="token"`
    And   one of the following values for <token> is provided
          |<token>     |
          |''        |
          |{}        |
          |{ test: 'test' }|
          |[]        |
          |['test']  |
          |null      |
          |undefined |
          |true      |
          |false     |
          |0         |
          |-1        |
    Then  a relevant error is received

  Scenario: Run `capsula-hub build` with specifying an invalid output path
    Given a valid token with configuration
    When  I run the command `capsula-hub build --token="token" --output="output" `
    And   one of the following values for <output> is provided
          |<output>    |
          | 'abc'    |
          | 65536    |
          | 0        |
          |{}        |
          |{ test: 'test' }|
          |[]        |
          |['test']  |
          |null      |
          |undefined |
          |true      |
          |false     |
          |-1        |
    Then  a relevant error is received

  Scenario: Run `capsula-hub build` with an invalid value of <configProvider>
    Given a valid token with configuration
    When  I run the command `capsula-hub build --token="token" --configProvider="configProvider" `
    And   one of the following values for <configProvider> is provided
          |<configProvider>    |
          | 'abc'    |
          | 65536    |
          | 0        |
          |{}        |
          |{ test: 'test' }|
          |[]        |
          |['test']  |
          |null      |
          |undefined |
          |true      |
          |false     |
          |-1        |
    Then  a relevant error is received

  Scenario: Run `capsula-hub build` with an non-existent configProvider throws an error
    Given a valid token with configuration
    When  I run the command `capsula-hub build --token="token" --configProvider="configProvider" `
    And   "configProvider" is not in the list of available configuration types
    Then  a relevant error is received
