export class Uuid {
  private constructor(private readonly value: string) {}

  // Aceita v1-v5 (ajuste se quiser só v4)
  private static readonly UUID_ANY =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  static isValid(raw: string): boolean {
    return this.UUID_ANY.test(raw);
  }

  static create(raw: string): Uuid {
    if (!Uuid.isValid(raw)) {
      throw new Error(`Invalid UUID: ${raw}`);
    }
    return new Uuid(raw.toLowerCase());
  }

  toString(): string {
    return this.value;
  }

  equals(other: Uuid): boolean {
    return this.value === other.value;
  }
}
