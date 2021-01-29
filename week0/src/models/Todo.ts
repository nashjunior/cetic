export type TodoInterface = {
  id: number;
  title: string;
  done: boolean;
};

export default class Todo {
  private id: number;
  private title: string;
  private done: boolean;

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getDone(): boolean {
    return this.done;
  }

  public setDone(done: boolean): void {
    this.done = done;
  }

  constructor({ done, id, title }: TodoInterface) {
    this.done = done;
    this.title = title;
    this.id = id;
  }
}
