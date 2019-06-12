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
    When  I run the command `capsula-hub run --token="invalidToken"`
    Then  a relevant error is received

  Scenario: Run Capsula-Hub instance with invalid port
    Given a valid token with configuration
    When  I run the command `capsula-hub run --token="token" --port="invalidPort" `
    Then  a relevant error is received

  Scenario: Run Capsula-Hub instance with an invalid value of <configProvider>
    Given a valid token with configuration
    When  I run the command `capsula-hub run --token="token" --configProvider="invalidProvider" `
    Then  a relevant error is received

  Scenario: Run Capsula-Hub instance twice on the same port
    Given a valid token with configuration
    And   a valid port
    When  I run the command `capsula-hub run --token="token" --port="port" `
    And   I run the same command again
    Then  a relevant error is received

  Scenario: Run Capsula-Hub  instance with the same token for different configProvider on two different ports
    Given a valid token with configuration
    And   two valid ports "6666" and "8888"
    When  I run the command `capsula-hub run --token="token" --configProvider="hardcoreServer" --dispatcherUrl="dispatcherUrl" --port="6666"`
    And   I run the command `capsula-hub run --token="token" --port="8888"`
    Then  an workspace instance is created that is running on port "6666"
    And   hardcoreServer is the configuration provider used
    And   an workspace instance is created that is running on port "8888"
    And   httpFile is the configuration provider used

  Scenario: Run Capsula-Hub  instance with two different token on two different ports
    Given two valid tokens with different configuration
    And   two valid ports "6666" and "8888"
    When  I run the command `capsula-hub run --token="token1" --port="6666"`
    And   I run the command `capsula-hub run --token="token2" --port="8888"`
    Then  an workspace instance with configuration of tenant 1 is created that is running on port "6666" 
    And   an workspace instance with configuration of tenant 2 is created that is running on port "8888"
    And   httpFile is the configuration provider used for both workspaces
    
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
    When  I run the command `capsula-hub build --token="invalidToken"`
    Then  a relevant error is received

  Scenario: Run `capsula-hub build` with specifying an invalid output path
    Given a valid token with configuration
    When  I run the command `capsula-hub build --token="token" --output="invalidOutput" `
    Then  a relevant error is received

  Scenario: Run `capsula-hub build` with an invalid value of <configProvider>
    Given a valid token with configuration
    When  I run the command `capsula-hub build --token="token" --configProvider="invalidProvider" `
    Then  a relevant error is received

  Scenario: Run `capsula-hub build` with an non-existent configProvider throws an error
    Given a valid token with configuration
    When  I run the command `capsula-hub build --token="token" --configProvider="configProvider" `
    And   "configProvider" is not in the list of available configuration types
    Then  a relevant error is received
