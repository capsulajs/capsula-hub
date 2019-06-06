import { CapsulaHubArgs } from './CapsulaHubArgs';

/**
 * The arguments that are used for "run" command of the app
 */
export interface CapsulaHubRunArgs extends CapsulaHubArgs {
  /**
   * The port on which the application will run locally (for instance, http://localhost:5555/)
   * @default 5555
   */
  port?: number;
}
