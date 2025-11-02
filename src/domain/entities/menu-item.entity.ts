export class MenuItem {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly tags: string[] = [],
  ) {}
}
