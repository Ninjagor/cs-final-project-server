import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

export function generateUsername(): string {
    const customConfig: Config = {
      dictionaries: [adjectives, animals],
      separator: '-',
      length: 2,
    };

    return uniqueNamesGenerator(customConfig) as string;
}
