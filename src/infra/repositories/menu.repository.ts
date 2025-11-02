import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { MenuItem } from '../../domain/entities/menu-item.entity';

interface MenuSection {
  category: string;
  items: MenuItem[];
}

interface MenuData {
  sections: MenuSection[];
}

@Injectable()
export class MenuRepository {
  private readonly menuPath = resolve(process.cwd(), 'src/data/menu.json');

  loadMenu(): MenuData {
    try {
      const file = readFileSync(this.menuPath, 'utf-8');
      return JSON.parse(file) as MenuData;
    } catch (err) {
      console.error('Error loading menu:', err);
      throw new InternalServerErrorException('Falha ao carregar o cardápio.');
    }
  }
}
