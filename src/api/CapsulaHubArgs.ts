/**
 * The arguments that are used for "run" and "build" command of the app
 */
import { ConfigurationType } from './ConfigurationType';

export interface CapsulaHubArgs {
  /**
   * The path to the configuration (the format of the path depends on configurationType)
   */
  configurationPath: string;
  /**
   * The type of configuration provider
   * @default "httpFile"
   */
  configurationType?: ConfigurationType;
  /**
   * The token that will be used for auth
   */
  token?: string;
  /**
   * Relative path to the output folder
   * @default "./dist"
   */
  output?: string;
}
