Feature: Build and Run commands for CapsulaHub CLI

  Background:
    Given an npm package called @capsulajs/capsulahub
    And   a default port 55555
    And   a default configProvider httpFile
    And   the following <configProvider> available
          |<configProvider>                   |
          |LocalFileConfigurationProvider     |
          |HttpFileConfigurationProvider      |
          |ScalecubeConfigurationProvider|
          |HttpServerConfigurationProvider    |
          |LocalStorageConfigurationProvider  |
    And   a valid port is a number between 1024 and 65535

#______________________________________POSITIVE______________________________________

  #1
  Scenario: Run CapsulaHub instance with specifying valid arguments (check for every <configProvider>)
    Given a valid token with configuration
    When  I run the command `capsulahub run --token="token" --configProvider="configProvider" --dispatcherUrl="dispatcherUrl" --port="port"` #add dispatcherUrl only for scalecube provider
    And   "configProvider" is one from the available providers
    Then  an workspace is created
    And   workspace is running on localhost on the specified port
    And   the specified configProvider is used

  #2
  Scenario: Run CapsulaHub instance without specifying the port and configProvider
    Given a valid token with configuration
    When  I run the command `capsulahub run --token="token"`
    Then  an workspace is created
    And   workspace is running on localhost on the default port
    And   httpFile is the configuration provider used

  #3
  Scenario: Run CapsulaHub instance with the same token for different configProvider on two different ports
    Given a valid token with configuration
    And   two valid ports "6666" and "8888"
    When  I run the command `capsulahub run --token="token" --configProvider="scalecube" --dispatcherUrl="dispatcherUrl" --port="6666"`
    And   I run the command `capsulahub run --token="token" --port="8888"`
    Then  an workspace instance is created that is running on port "6666"
    And   hardcoreServer is the configuration provider used
    And   an workspace instance is created that is running on port "8888"
    And   httpFile is the configuration provider used

   #4
  Scenario: Run CapsulaHub instance with two different tokens on two different ports
    Given two valid tokens with different configuration
    And   two valid ports "6666" and "8888"
    When  I run the command `capsulahub run --token="token1" --port="6666"`
    And   I run the command `capsulahub run --token="token2" --port="8888"`
    Then  an workspace instance with configuration of tenant 1 is created that is running on port "6666"
    And   an workspace instance with configuration of tenant 2 is created that is running on port "8888"
    And   httpFile is the configuration provider used for both workspaces

#______________________________________NEGATIVE______________________________________

  #1
  Scenario: Run CapsulaHub instance with invalid token
    When  I run the command `capsulahub run --token="invalidToken"`
    Then  a relevant error is received

  #2
  Scenario: Run CapsulaHub instance with invalid port
    Given a valid token with configuration
    When  I run the command `capsulahub run --token="token" --port="invalidPort" `
    Then  a relevant error is received

   #3
  Scenario: Run CapsulaHub instance with an invalid value of <configProvider>
    Given a valid token with configuration
    When  I run the command `capsulahub run --token="token" --configProvider="invalidProvider" `
    Then  a relevant error is received

  #4
  Scenario: Run CapsulaHub instance twice on the same port
    Given a valid token with configuration
    And   a valid port
    When  I run the command `capsulahub run --token="token" --port="port" `
    And   I run the same command again
    Then  a relevant error is received
