Feature: Build and Run commands for CapsulaHub CLI

  Background:
    Given an npm package called @capsulajs/capsulahub
    And   a default configProvider httpFile
    And   the following <configProvider> available
          |<configProvider>                   |
          |LocalFileConfigurationProvider     |
          |HttpFileConfigurationProvider      |
          |ScalecubeConfigurationProvider|
          |HttpServerConfigurationProvider    |
          |LocalStorageConfigurationProvider  |
    And   a default path to the output folder "./dist"

#______________________________________POSITIVE______________________________________

  #1
  Scenario: Run `capsulahub build` with specifying valid arguments (check for every <configProvider>)
    Given a valid token with configuration
    When  I run the command `capsulahub build --token="token" --configProvider="configProvider" --dispatcherUrl="dispatcherUrl" --output="output"` #add dispatcherUrl only for scalecube provider
    And   "configProvider" is one from the available providers
    Then  the app is built
    And   the result of the build is put in the specified output path
    And   the specified configProvider is used

   #2
  Scenario: Run `capsulahub build` without specifying the output and configProvider
    Given a valid token with configuration
    When  I run the command `capsulahub build --token="token"`
    Then  the app is built
    And   the result of the build is put in the default output path "./dist"
    And   httpFile is the configuration provider used

#______________________________________NEGATIVE______________________________________

  #1
  Scenario: Run `capsulahub build` with an non-existent configProvider throws an error
    Given a valid token with configuration
    When  I run the command `capsulahub build --token="token" --configProvider="configProvider" `
    And   "configProvider" is not in the list of available configuration types
    Then  a relevant error is received

  #2
  Scenario: Run `capsulahub build` with invalid token
    When  I run the command `capsulahub build --token="invalidToken"`
    Then  a relevant error is received

  #3
  Scenario: Run `capsulahub build` with specifying an invalid output path
    Given a valid token with configuration
    When  I run the command `capsulahub build --token="token" --output="invalidOutput" `
    Then  a relevant error is received

  #4
  Scenario: Run `capsulahub build` with an invalid value of <configProvider>
    Given a valid token with configuration
    When  I run the command `capsulahub build --token="token" --configProvider="invalidProvider" `
    Then  a relevant error is received
