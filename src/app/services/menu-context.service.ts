import { Injectable } from '@nestjs/common';
import { MenuRepository } from '../../infra/repositories/menu.repository';

@Injectable()
export class MenuContextService {
  constructor(private readonly menuRepository: MenuRepository) {}

  buildContext(): string {
    const { sections } = this.menuRepository.loadMenu();

    const formattedSections = sections
      .map(
        (section) => `
### ${section.category}
${section.items
  .map((item) => `- ${item.name}: ${item.description} (R$ ${item.price.toFixed(2)})`)
  .join('\n')}
`,
      )
      .join('\n');

    return `Cardápio atual do Serjão Lanches:\n${formattedSections}`;
  }
}
