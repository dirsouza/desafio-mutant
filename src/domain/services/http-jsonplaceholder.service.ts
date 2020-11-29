import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';
import * as config from 'config';

export type TJsonPlaceholderConfig = {
  baseURL: string;
  timeout: number;
  maxRedirects: number;
};

export const jsonplaceholderConfig: TJsonPlaceholderConfig = config.get(
  'jsonplaceholder',
);

@Injectable()
export class HttpJsonplaceholderService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: jsonplaceholderConfig.baseURL,
      timeout: jsonplaceholderConfig.timeout,
      maxRedirects: jsonplaceholderConfig.maxRedirects,
    };
  }
}
