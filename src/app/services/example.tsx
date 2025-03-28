class ExampleClass {
  private readonly example: string;
  private readonly example2: number;

  constructor(example: string, example2: number) {
    this.example = example;
    this.example2 = example2;
  }

  getDetails(): string {
    return `Example: ${this.example}, Example2: ${this.example2}`;
  }
}
export default ExampleClass;
