Feature: Build and Run commands for CapsulaHub CLI

  Background:
    Given an npm package called @capsulajs/capsulahub
    And   a default configProvider httpFile
    And   a default path to the output folder "./dist"

#______________________________________POSITIVE______________________________________

  #1
  Scenario: Run `capsulahub build` with specifying valid arguments (check for HttpFile provider)
    Given a configuration that includes component A
    And   token B that allow access to this configuration using HttpFileConfigurationProvider
    When  I run the command `capsulahub build --token="tokenB" --configProvider="HttpFile" --output="output"`
    Then  the app is built in the specified output path
    And   HttpFile is the provider used to get configuration of token B

  #2
  Scenario: Run `capsulahub build` with specifying valid arguments (check for LocalFile, Scalecube, HttpServer and LocalStorage provider)
    Given a configuration that includes component A
    And   token B that allow access to this configuration using <configProvider> and <dispatcherUrl>
          |<configProvider>                   |<dispatcherUrl>
          |LocalFileConfigurationProvider     |(empty)
          |ScalecubeConfigurationProvider     |'url123'
          |HttpServerConfigurationProvider    |(empty)
          |LocalStorageConfigurationProvider  |(empty)
    When  I run the command `capsulahub build --token="tokenB" --configProvider="configProvider" --output="output"`
    Then  the app is built in the specified output path using right configuration provider

   #3
  Scenario: Run `capsulahub build` without specifying the output and configProvider
    Given a configuration that includes component A
    And   token B that allow access to this configuration
    When  I run the command `capsulahub build --token="tokenB"`
    Then  the app is built in the default output path "./dist"
    And   HttpFile is the provider used to get configuration of token B

#______________________________________NEGATIVE______________________________________

  #1
  Scenario: Run `capsulahub build` with an non-existent configProvider throws an error
    Given a configuration that includes component A
    And   token B that allow access to this configuration
    When  I run the command `capsulahub build --token="tokenB" --configProvider="configProvider" `
    And   "configProvider" is not in the list of available configuration types
    Then  a relevant error is received

  #2
  Scenario: Run `capsulahub build` with invalid token
    When  I run the command `capsulahub build --token="invalidToken"`
    Then  a relevant error is received

  #3
  Scenario: Run `capsulahub build` with specifying an invalid output path
    Given a configuration that includes component A
    And   token B that allow access to this configuration
    When  I run the command `capsulahub build --token="tokenB" --output="invalidOutput" `
    Then  a relevant error is received

  #4
  Scenario: Run `capsulahub build` with an invalid value of <configProvider>
    Given a configuration that includes component A
    And   token B that allow access to this configuration
    When  I run the command `capsulahub build --token="tokenB" --configProvider="invalidProvider" `
    Then  a relevant error is received
