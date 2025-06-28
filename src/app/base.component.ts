export class BaseComponent {
  protected consoleHead!: string
  protected log = (msg:string) => console.log(this.consoleHead, msg)
}
