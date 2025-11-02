import { Test, TestingModule } from '@nestjs/testing';
import { MenuContextService } from './menu-context.service';
import { MenuRepository } from '../../infra/repositories/menu.repository';

describe('MenuContextService', () => {
  let service: MenuContextService;
  let menuRepository: jest.Mocked<MenuRepository>;

  beforeEach(async () => {
    const mockMenuRepository = {
      loadMenu: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuContextService,
        {
          provide: MenuRepository,
          useValue: mockMenuRepository,
        },
      ],
    }).compile();

    service = module.get<MenuContextService>(MenuContextService);
    menuRepository = module.get(MenuRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buildContext', () => {
    it('should format menu with single section and single item', () => {
      menuRepository.loadMenu.mockReturnValue({
        sections: [
          {
            category: 'Lanches',
            items: [
              {
                name: 'X-Burger',
                description: 'Hambúrguer com queijo',
                price: 15.5,
                tags: ['lanche', 'queijo'],
              },
            ],
          },
        ],
      });

      const result = service.buildContext();

      expect(result).toContain('Cardápio atual do Serjão Lanches:');
      expect(result).toContain('### Lanches');
      expect(result).toContain('- X-Burger: Hambúrguer com queijo (R$ 15.50)');
    });

    it('should format menu with multiple sections and items', () => {
      menuRepository.loadMenu.mockReturnValue({
        sections: [
          {
            category: 'Lanches',
            items: [
              {
                name: 'X-Burger',
                description: 'Hambúrguer com queijo',
                price: 15.5,
                tags: ['lanche', 'queijo'],
              },
              {
                name: 'X-Bacon',
                description: 'Hambúrguer com bacon',
                price: 18.0,
                tags: ['lanche', 'bacon'],
              },
            ],
          },
          {
            category: 'Bebidas',
            items: [
              {
                name: 'Coca-Cola',
                description: 'Refrigerante',
                price: 5.0,
                tags: ['bebida', 'refrigerante'],
              },
            ],
          },
        ],
      });

      const result = service.buildContext();

      expect(result).toContain('### Lanches');
      expect(result).toContain('- X-Burger: Hambúrguer com queijo (R$ 15.50)');
      expect(result).toContain('- X-Bacon: Hambúrguer com bacon (R$ 18.00)');
      expect(result).toContain('### Bebidas');
      expect(result).toContain('- Coca-Cola: Refrigerante (R$ 5.00)');
    });

    it('should format prices with two decimal places', () => {
      menuRepository.loadMenu.mockReturnValue({
        sections: [
          {
            category: 'Lanches',
            items: [
              {
                name: 'X-Salada',
                description: 'Hambúrguer com salada',
                price: 12.0,
                tags: ['lanche', 'salada'],
              },
            ],
          },
        ],
      });

      const result = service.buildContext();

      expect(result).toContain('(R$ 12.00)');
    });

    it('should handle empty sections array', () => {
      menuRepository.loadMenu.mockReturnValue({
        sections: [],
      });

      const result = service.buildContext();

      expect(result).toBe('Cardápio atual do Serjão Lanches:\n');
    });
  });
});
