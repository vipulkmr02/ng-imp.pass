import { environment as env } from "../environments/environment"

export class BaseClass {
  protected consoleHead!: string
  protected log = (msg: string) => env.production || console.log(this.consoleHead, msg)
}
