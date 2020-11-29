import { Test, TestingModule } from '@nestjs/testing';
import * as config from 'config';
import {
  HttpJsonplaceholderService,
  TJsonPlaceholderConfig,
} from 'Domain/services';

const mockHttpService: TJsonPlaceholderConfig = config.get('jsonplaceholder');

describe('HttpJsonplaceholderService', () => {
  let jsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpJsonplaceholderService],
    }).compile();

    jsonService = await module.get<HttpJsonplaceholderService>(
      HttpJsonplaceholderService,
    );
  });

  it('should service and repositories must be defined', () => {
    expect(jsonService).toBeDefined();
  });

  describe('createHttpOptions()', () => {
    it('should return an array of settings', () => {
      const settings = jsonService.createHttpOptions();

      expect(settings).toEqual(mockHttpService);
    });
  });
});
